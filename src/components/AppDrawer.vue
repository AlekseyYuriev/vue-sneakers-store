<template>
  <div
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    @click="closeDrawer"
  ></div>
  <div
    class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col"
    v-auto-animate
  >
    <DrawerHead @close-drawer="closeDrawer" />

    <div v-if="totalPrice > 0" class="flex flex-col flex-1 overflow-auto">
      <CartItemList />

      <div class="flex flex-col gap-4 my-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} руб.</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ taxSum }} руб.</b>
        </div>
      </div>

      <button
        @click="createNewOrder"
        :disabled="totalPrice <= 0 || isOrderLoading"
        class="transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        :class="{
          'disabled:bg-yellow-300': isOrderLoading,
          'disabled:cursor-wait': isOrderLoading,
        }"
      >
        {{ orderButtonText }}
      </button>
    </div>
    <div v-else-if="!orderId" class="flex h-full items-center">
      <InfoBlock
        image-url="/package-icon.png"
        title="Корзина пуста"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
      />
    </div>

    <div v-else class="flex h-full items-center">
      <InfoBlock
        image-url="/order-success-icon.png"
        title="Заказ оформлен!"
        :description="`Ваш заказ №${orderId} скоро будет передан курьерской доставке.`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref } from "vue"
import { createOrder } from "@/services/orders"
import DrawerHead from "@/components/DrawerHead.vue"
import CartItemList from "@/components/CartItemList.vue"
import InfoBlock from "@/components/InfoBlock.vue"
import type { IFullSneaker } from "@/types/sneaker"

const { cart } = inject("cart") as {
  cart: Ref<IFullSneaker[]>
}

const props = defineProps<{
  totalPrice: number
}>()

const emit = defineEmits({
  closeDrawer: null,
})

const isOrderLoading = ref(false)
const orderId = ref<null | number>(null)

const createNewOrder = async () => {
  isOrderLoading.value = true

  const newOrder = await createOrder(cart.value, props.totalPrice)

  cart.value = []

  orderId.value = newOrder.id
  isOrderLoading.value = false
}

const closeDrawer = () => {
  emit("closeDrawer")
}

const taxSum = computed(() => {
  return (props.totalPrice * 0.05).toFixed(2)
})

const orderButtonText = computed(() => {
  return isOrderLoading.value ? "Заказ оформляется..." : "Оформить заказ"
})
</script>
