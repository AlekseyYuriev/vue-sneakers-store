<template>
  <div class="grid grid-cols-4 gap-5">
    <AppCard
      v-for="item in sneakers"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
      :isLoading="isLoading"
      @add-to-favorite="addToFavorite"
    />
  </div>
</template>

<script setup lang="ts">
import AppCard from "@/components/AppCard.vue"
import type { IFullSneaker } from "@/types/sneaker"
import { idText } from "typescript"

defineProps<{
  sneakers: IFullSneaker[]
  isLoading: boolean
}>()

const emit = defineEmits({
  addToFavorite: null,
})

const addToFavorite = (id: number) => {
  emit("addToFavorite", id)
}
</script>
