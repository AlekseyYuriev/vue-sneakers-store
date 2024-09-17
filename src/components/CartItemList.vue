<template>
  <div class="flex flex-col flex-1 gap-4">
    <CartItem
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      image-url="/sneakers/sneakers-1.jpg"
      :price="14.99"
      :is-added="false"
      :is-favorite="false"
    />
    <CartItem />
    <CartItem />
  </div>
</template>

<script setup lang="ts">
import CartItem from "@/components/CartItem.vue"
</script>

<style scoped></style>
