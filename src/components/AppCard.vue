<template>
  <div
    class="relative flex flex-col w-full h-full border border-slate-100 rounded-xl p-4 sm:p-6 md:p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <button
      @click="handleFavorite"
      class="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 disabled:cursor-wait"
      :disabled="isLoading"
    >
      <img :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" alt="Favorite" />
    </button>
    <img class="w-full" :src="imageUrl" alt="Sneaker" />
    <p class="mt-2 text-sm sm:text-base">{{ title }}</p>

    <div class="flex justify-between mt-auto pt-3 sm:pt-5">
      <div class="flex flex-col">
        <span class="text-slate-400 text-xs sm:text-sm">Цена:</span>
        <b class="text-sm sm:text-base">{{ price }} руб.</b>
      </div>

      <img
        v-if="isAdded !== undefined"
        @click="handleCart"
        class="w-7 h-7 sm:w-8 sm:h-8"
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  imageUrl: string
  price: number
  isFavorite: boolean
  isAdded?: boolean
  isLoading: boolean | undefined
}>()

const emit = defineEmits({
  handleFavorite: null,
  handleCart: null,
})

const handleFavorite = () => {
  emit("handleFavorite", props.id)
}

const handleCart = () => {
  emit("handleCart")
}
</script>
