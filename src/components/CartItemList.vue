<template>
  <div class="flex flex-col flex-1 gap-4 overflow-auto" v-auto-animate>
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
