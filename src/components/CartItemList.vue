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
      @remove-from-cart="deleteItemFromCart(item)"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from "vue"
import CartItem from "@/components/CartItem.vue"
import type { IFullSneaker } from "@/types/sneaker"
import useCart from "@/composables/useCart"

const { cart } = inject("cart") as {
  cart: Ref<IFullSneaker[]>
}

const { removeFromCart } = useCart()

const deleteItemFromCart = (item: IFullSneaker) => {
  removeFromCart(item, cart)
}
</script>

<style scoped></style>
