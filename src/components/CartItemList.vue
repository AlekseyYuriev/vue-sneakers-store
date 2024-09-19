<template>
  <div v-if="cart.length > 0" class="flex flex-col flex-1 gap-4 overflow-auto">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      @remove-from-cart="removeFromCart(item)"
    />
  </div>
  <div v-else class="flex flex-col flex-1 gap-4">
    <h2>Ваша корзина пуста</h2>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue"
import CartItem from "@/components/CartItem.vue"
import type { IFullSneaker } from "@/types/sneaker"

const { cart, removeFromCart } = inject("cart") as {
  cart: IFullSneaker[]
  removeFromCart: Function
}
</script>

<style scoped></style>
