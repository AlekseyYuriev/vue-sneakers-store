<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />

    <div class="flex flex-col justify-between w-full">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b>{{ price }} руб.</b>
        <img
          @click="removeFromCart"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number
  title: string
  imageUrl: string
  price: number
  isFavorite: boolean
  isAdded?: boolean
}>()

const emit = defineEmits({
  removeFromCart: null,
})

const removeFromCart = () => {
  emit("removeFromCart")
}
</script>

<style scoped></style>
