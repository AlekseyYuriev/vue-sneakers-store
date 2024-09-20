<template>
  <div>
    <h2 class="text-3xl font-bold mb-20">Мои закладки</h2>

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
import axios from "axios"
import AppCardList from "@/components/AppCardList.vue"
import type { IFullSneaker } from "@/types/sneaker"
import type { IFavoriteSneakerServerData } from "@/types/favorites"

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

  try {
    await axios.delete(`https://94b7cd2ddefb8133.mokky.dev/favorites/${id}`)

    favorites.value.splice(
      favorites.value.indexOf(sneakerToRemoveFromFavorite),
      1
    )
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  const savedCart = localStorage.getItem("cart")
  cart.value = savedCart ? JSON.parse(savedCart) : []

  try {
    const { data } = await axios.get(
      "https://94b7cd2ddefb8133.mokky.dev/favorites?_relations=items"
    )

    data.forEach((elem: IFavoriteSneakerServerData) => {
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
  } catch (error) {
    console.log(error)
  }
})
</script>
