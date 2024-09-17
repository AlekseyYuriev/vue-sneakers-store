<template>
  <div class="grid grid-cols-4 gap-5">
    <AppCard
      v-for="item in sneakers"
      :key="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
    />
  </div>
</template>

<script setup lang="ts">
import AppCard from "@/components/AppCard.vue"
import type { ISneaker } from "@/types/sneaker"

const props = defineProps<{
  sneakers: ISneaker[]
}>()
</script>

<style scoped></style>
