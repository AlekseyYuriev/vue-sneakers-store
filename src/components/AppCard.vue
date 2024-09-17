<template>
  <div>
    <div
      class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
    >
      <img
        @click="onClickFavroite"
        :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
        alt="Like"
        class="absolute top-8 left-8"
      />
      <img :src="imageUrl" alt="Sneaker" />
      <p class="mt-2">{{ title }}</p>

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
