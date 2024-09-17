<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" src="/sneakers/sneakers-1.jpg" alt="Sneaker" />

    <div class="flex flex-col justify-between">
      <p>Кроссовки Nike Air Max 270</p>

      <div class="flex justify-between mt-2">
        <b>14.99 usd</b>
        <img
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imageUrl: String,
})
</script>

<style scoped></style>
