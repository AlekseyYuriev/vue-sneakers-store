<template>
  <AppDrawer
    v-if="isDrawerOpen"
    :totalPrice="totalPrice"
    :isOrderLoading="isOrderLoading"
    @close-drawer="closeDrawer"
    @create-order="createOrder"
  />

  <div
    class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14"
    id="main"
    :style="{ paddingRight: scrollbarWidth }"
  >
    <AppHeader @open-drawer="openDrawer" :totalPrice="totalPrice" />

    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from "vue"
import { storeToRefs } from "pinia"
import axios from "axios"
import AppHeader from "@/components/AppHeader.vue"
import AppDrawer from "@/components/AppDrawer.vue"
import { useScrollbarWidth } from "@/store/scrollbarWidth"
import handleScrollPadding from "@/utils/handleScrollPadding"
import type { IFullSneaker } from "@/types/sneaker"

const { scrollbarWidth } = storeToRefs(useScrollbarWidth())

const cart = ref<IFullSneaker[]>([])
const isDrawerOpen = ref(false)
const isOrderLoading = ref(false)

const addToCart = (sneakerForCart: IFullSneaker) => {
  sneakerForCart.isAdded = true
  cart.value.push(sneakerForCart)
}

const removeFromCart = (sneakerForCart: IFullSneaker) => {
  const isSneakerAddedToCart = cart.value.find(
    (item) => item.id === sneakerForCart.id
  )

  if (isSneakerAddedToCart) {
    cart.value.splice(cart.value.indexOf(isSneakerAddedToCart), 1)
    sneakerForCart.isAdded = false
  }
}

const createOrder = async () => {
  isOrderLoading.value = true
  try {
    await axios.post(`https://94b7cd2ddefb8133.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value,
    })

    cart.value = []
  } catch (error) {
    console.log(error)
  } finally {
    isOrderLoading.value = false
  }
}

const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const totalPrice = computed(() => {
  return cart.value
    ? cart.value.reduce((acc, curVal) => acc + curVal.price, 0)
    : 0
})

watch(isDrawerOpen, (newValue) => {
  handleScrollPadding(newValue)
})

watch(
  cart,
  () => {
    localStorage.setItem("cart", JSON.stringify(cart.value))
  },
  { deep: true }
)

provide("cart", { cart, removeFromCart, addToCart })
</script>
