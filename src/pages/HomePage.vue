<template>
  <div class="flex justify-between items-center mb-8">
    <h2 class="text-3xl font-bold">Все кроссовки</h2>

    <div class="flex gap-4">
      <select
        v-model="filters.sortBy"
        class="py-2 px-3 border rounded-md outline-none text-gray-400 focus:text-black"
      >
        <option value="title" disabled hidden>Фильтровать по</option>
        <option value="name">По названию</option>
        <option value="price">По цене (дешёвые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
        <input
          v-model="filters.searchQuery"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <AppCardList
    :sneakers="sneakers"
    :isLoading="isLoading"
    @handle-favorite="handleFavorite"
    @handle-cart="handleCart"
    v-auto-animate
  />
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch, type Ref } from "vue"
import axios from "axios"
import AppCardList from "@/components/AppCardList.vue"
import type { IFullSneaker, ISneaker } from "@/types/sneaker"
import type { IFilter } from "@/types/filters"
import type { IParams } from "@/types/params"
import type { IFavoriteSneaker } from "@/types/favorites"

const { cart, removeFromCart, addToCart } = inject("cart") as {
  cart: Ref<IFullSneaker[]>
  removeFromCart: Function
  addToCart: Function
}

const sneakers = ref<IFullSneaker[]>([])
const isLoading = ref(false)

const filters = reactive<IFilter>({
  sortBy: "title",
  searchQuery: "",
})

const handleFavorite = async (id: number) => {
  isLoading.value = true
  const likedSneaker = sneakers.value.find(
    (item: IFullSneaker) => item.id === id
  )

  if (!likedSneaker) return

  try {
    if (likedSneaker.isFavorite) {
      await axios.delete(
        `https://94b7cd2ddefb8133.mokky.dev/favorites/${likedSneaker.favoriteId}`
      )

      likedSneaker.favoriteId = null
      likedSneaker.isFavorite = false
    } else {
      const obj = {
        parentId: id,
      }

      const { data } = await axios.post(
        `https://94b7cd2ddefb8133.mokky.dev/favorites`,
        obj
      )

      likedSneaker.favoriteId = data.id
      likedSneaker.isFavorite = true
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const handleCart = (sneakerForCart: IFullSneaker) => {
  sneakerForCart.isAdded
    ? removeFromCart(sneakerForCart)
    : addToCart(sneakerForCart)
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(
      "https://94b7cd2ddefb8133.mokky.dev/favorites"
    )

    sneakers.value = sneakers.value.map((item: IFullSneaker) => {
      const favorite = favorites.find(
        (favorite: IFavoriteSneaker) => favorite.parentId === item.id
      )

      if (!favorite) {
        return item
      }

      item.isFavorite = true
      item.favoriteId = favorite.id
      return item
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  try {
    const params: IParams = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(
      "https://94b7cd2ddefb8133.mokky.dev/items",
      {
        params,
      }
    )

    sneakers.value = data.map((item: ISneaker) => ({
      ...item,
      isFavorite: false,
      isAdded: false,
      favoriteId: null,
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const savedCart = localStorage.getItem("cart")
  cart.value = savedCart ? JSON.parse(savedCart) : []

  await fetchItems()
  await fetchFavorites()

  sneakers.value.forEach(
    (sneaker) =>
      (sneaker.isAdded = cart.value.some(
        (cartItem: IFullSneaker) => cartItem.id === sneaker.id
      ))
  )
})

watch(filters, async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(cart, () => {
  sneakers.value.forEach((sneaker) => {
    sneaker.isAdded = false
  })
})
</script>
