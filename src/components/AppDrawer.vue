<template>
  <div
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    @click="closeDrawer"
  ></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 flex flex-col">
    <DrawerHead @close-drawer="closeDrawer" />

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
      @click="createOrder"
      :disabled="totalPrice <= 0 || isOrderLoading"
      class="transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
      :class="{ 'disabled:bg-yellow-300': isOrderLoading }"
    >
      {{ orderButtonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import DrawerHead from "@/components/DrawerHead.vue"
import CartItemList from "@/components/CartItemList.vue"

const props = defineProps<{
  totalPrice: number
  isOrderLoading: boolean
}>()

const emit = defineEmits({
  closeDrawer: null,
  createOrder: null,
})

const closeDrawer = () => {
  emit("closeDrawer")
}

const createOrder = () => {
  emit("createOrder")
}

const taxSum = computed(() => {
  return (props.totalPrice * 0.05).toFixed(2)
})

const orderButtonText = computed(() => {
  return props.isOrderLoading ? "Заказ оформляется..." : "Оформить заказ"
})
</script>
