<template>
  <div>
    <div class="flex gap-5">
      <RouterLink to="/">
        <div
          class="h-9 w-9 border border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-orange-300 transition hover:scale-105"
        >
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 11L1 6L6 1"
              stroke="#C8C8C8"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </RouterLink>
      <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
    </div>

    <AppCardList
      :sneakers="favorites"
      :isLoading="isLoading"
      @handle-favorite="removeFromFavorite"
      v-auto-animate
    />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from "vue"
import AppCardList from "@/components/AppCardList.vue"
import type { IFullSneaker } from "@/types/sneaker"
import type { IFavoriteSneakerServerData } from "@/types/favorites"
import {
  deleteSneakerFromFavorites,
  getAllFavoriteSneakers,
} from "@/services/sneakers"

const { cart } = inject("cart") as {
  cart: Ref<IFullSneaker[]>
}

const favorites = ref<IFullSneaker[]>([])
const isLoading = ref(false)

const removeFromFavorite = async (id: number) => {
  isLoading.value = true

  const sneakerToRemoveFromFavorite = favorites.value.find(
    (item) => item.id === id
  )

  if (!sneakerToRemoveFromFavorite) return

  await deleteSneakerFromFavorites(id)

  favorites.value.splice(
    favorites.value.indexOf(sneakerToRemoveFromFavorite),
    1
  )

  isLoading.value = false
}

onMounted(async () => {
  const savedCart = localStorage.getItem("cart")
  cart.value = savedCart ? JSON.parse(savedCart) : []

  const data = await getAllFavoriteSneakers()

  data?.forEach((elem: IFavoriteSneakerServerData) => {
    const sneaker = {
      id: elem.id,
      title: elem.item.title,
      price: elem.item.price,
      imageUrl: elem.item.imageUrl,
      isFavorite: true,
      favoriteId: elem.item.id,
    }

    favorites.value.push(sneaker)
  })
})
</script>
