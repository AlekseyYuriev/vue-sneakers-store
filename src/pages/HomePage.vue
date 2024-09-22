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
    @handle-cart="updateCart"
    v-auto-animate
  />
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch, type Ref } from "vue"
import debounce from "lodash.debounce"
import {
  addSneakerToFavorites,
  deleteSneakerFromFavorites,
  getAllSneakers,
  getFavoriteSneakersItemId,
} from "@/services/sneakers"
import AppCardList from "@/components/AppCardList.vue"
import useCart from "@/composables/useCart"
import type { IFullSneaker } from "@/types/sneaker"
import type { IFilter } from "@/types/filters"
import type { favoriteSneakerItemId, itemIdObj } from "@/types/favorites"

const { cart } = inject("cart") as {
  cart: Ref<IFullSneaker[]>
}

const { checkIfSneakerAddedToCart, handleCart } = useCart()

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

  if (likedSneaker.isFavorite) {
    await deleteSneakerFromFavorites(likedSneaker.favoriteId as number)

    likedSneaker.favoriteId = null
    likedSneaker.isFavorite = false
  } else {
    const itemIdObj: itemIdObj = {
      item_id: id,
    }

    const objSavedToFavorites = (await addSneakerToFavorites(
      itemIdObj
    )) as favoriteSneakerItemId

    likedSneaker.favoriteId = objSavedToFavorites.id
    likedSneaker.isFavorite = true
  }

  isLoading.value = false
}

const updateCart = (sneakerForCart: IFullSneaker) => {
  handleCart(sneakerForCart, cart)
}

const checkIfSneakerAddedToFavorites = async () => {
  const favoriteSneakers =
    (await getFavoriteSneakersItemId()) as favoriteSneakerItemId[]

  sneakers.value = sneakers.value.map((item: IFullSneaker) => {
    const favorite = favoriteSneakers.find(
      (favorite: favoriteSneakerItemId) => favorite.item_id === item.id
    )

    if (!favorite) {
      return item
    }

    item.isFavorite = true
    item.favoriteId = favorite.id
    return item
  })
}

const debouncedGetAllSneakersAndCheckFavorites = debounce(async () => {
  sneakers.value = (await getAllSneakers(filters)) as IFullSneaker[]
  checkIfSneakerAddedToCart(sneakers, cart)
  await checkIfSneakerAddedToFavorites()
}, 700)

onMounted(async () => {
  const savedCart = localStorage.getItem("cart")
  cart.value = savedCart ? JSON.parse(savedCart) : []

  sneakers.value = (await getAllSneakers(filters)) as IFullSneaker[]
  checkIfSneakerAddedToCart(sneakers, cart)
  await checkIfSneakerAddedToFavorites()
})

watch(
  () => filters.sortBy,
  async () => {
    sneakers.value = (await getAllSneakers(filters)) as IFullSneaker[]
    checkIfSneakerAddedToCart(sneakers, cart)
    await checkIfSneakerAddedToFavorites()
  }
)

watch(
  () => filters.searchQuery,
  () => {
    debouncedGetAllSneakersAndCheckFavorites()
  }
)

watch(
  cart,
  () => {
    checkIfSneakerAddedToCart(sneakers, cart)
  },
  {
    deep: true,
  }
)
</script>
