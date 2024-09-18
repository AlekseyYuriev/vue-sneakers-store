<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Logo" class="w-10" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кросовок</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li
        @click="openDrawer"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>14.99 руб.</b>
      </li>

      <li
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/heart.svg" alt="Favourite" />
        <span>Закладки</span>
      </li>

      <li
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/profile.svg" alt="Profile" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits({
  openDrawer: null,
})

const openDrawer = () => {
  emit("openDrawer")
}
</script>

<style scoped></style>
