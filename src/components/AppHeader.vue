<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кросовок</p>
        </div>
      </div>
    </RouterLink>
    <ul class="flex items-center gap-10">
      <li
        @click="openDrawer"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>

      <RouterLink to="/favorites">
        <li
          class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
        >
          <img src="/heart.svg" alt="Favourite" />
          <span>Закладки</span>
        </li>
      </RouterLink>

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

defineProps<{
  totalPrice: number
}>()

const openDrawer = () => {
  emit("openDrawer")
}
</script>
