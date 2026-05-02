<template>
  <header
    class="flex flex-col md:flex-row justify-between border-b border-slate-200 px-4 py-6 sm:px-10 sm:py-8 gap-5"
  >
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-8 sm:w-10" />
        <div>
          <h2 class="text-lg sm:text-xl font-bold uppercase leading-none">Vue Sneakers</h2>
          <p class="text-slate-400 text-sm sm:text-base">Магазин лучших кросовок</p>
        </div>
      </div>
    </RouterLink>

    <ul class="flex items-center gap-4 sm:gap-10 overflow-x-auto">
      <li
        @click="openDrawer"
        class="flex items-center cursor-pointer gap-2 sm:gap-3 text-gray-500 hover:text-black shrink-0"
      >
        <img src="/cart.svg" alt="Cart" />
        <b class="text-sm sm:text-base">{{ totalPrice }} руб.</b>
      </li>

      <RouterLink to="/favorites" class="shrink-0">
        <li
          class="flex items-center cursor-pointer gap-2 sm:gap-3 text-gray-500 hover:text-black"
        >
          <img src="/heart.svg" alt="Favourite" />
          <span class="text-sm sm:text-base">Закладки</span>
        </li>
      </RouterLink>

      <li
        class="flex items-center cursor-pointer gap-2 sm:gap-3 text-gray-500 hover:text-black shrink-0"
      >
        <img src="/profile.svg" alt="Profile" />
        <span class="text-sm sm:text-base">Профиль</span>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits({
  openDrawer: null,
})

defineProps<{
  totalPrice: number
}>()

const openDrawer = () => {
  emit("openDrawer")
}
</script>
