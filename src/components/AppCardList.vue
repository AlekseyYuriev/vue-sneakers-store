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
      @handle-favorite="handleFavorite"
      @handle-cart="handleCart(item)"
    />
  </div>
</template>

<script setup lang="ts">
import AppCard from "@/components/AppCard.vue"
import type { IFullSneaker } from "@/types/sneaker"

defineProps<{
  sneakers: IFullSneaker[]
  isLoading: boolean | undefined
}>()

const emit = defineEmits({
  handleFavorite: null,
  handleCart: null,
})

const handleFavorite = (id: number) => {
  emit("handleFavorite", id)
}

const handleCart = (sneakerForCart: IFullSneaker) => {
  emit("handleCart", sneakerForCart)
}
</script>
