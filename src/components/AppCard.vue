<template>
  <div>
    <div
      class="relative flex flex-col w-full border border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
    >
      <div @click="onClick" class="absolute top-8 left-8">
        <img :src="isLiked ? '/like-1.svg' : '/like-2.svg'" alt="Favorite" />
      </div>
      <img class="w-full" :src="imageUrl" alt="Sneaker" />
      <p class="mt-2 h-12">{{ title }}</p>

      <div class="flex justify-between mt-5">
        <div class="flex flex-col">
          <span class="text-slate-400">Цена:</span>
          <b>{{ price }} usd</b>
        </div>

        <img
          @click="onClickAdd"
          :src="isAdded ? '/checked.svg' : '/plus.svg'"
          alt="Plus"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavroite: Function,
})
</script>

<style scoped></style>
