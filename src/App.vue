<template>
  <AppDrawer
    v-if="isDrawerOpen"
    :totalPrice="totalPrice"
    :isOrderLoading="isOrderLoading"
    @close-drawer="closeDrawer"
    @create-order="createOrder"
  />

  <div
    class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14"
    id="main"
    :style="{ paddingRight: scrollbarWidth }"
  >
    <AppHeader @open-drawer="openDrawer" :totalPrice="totalPrice" />

    <div class="p-10">
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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, reactive, ref, watch } from "vue"
import { storeToRefs } from "pinia"
import axios from "axios"
import { useScrollbarWidth } from "@/store/scrollbarWidth"
import handleScrollPadding from "@/utils/handleScrollPadding"
import AppHeader from "@/components/AppHeader.vue"
import AppCardList from "@/components/AppCardList.vue"
import AppDrawer from "@/components/AppDrawer.vue"
import type { IFullSneaker, ISneaker } from "@/types/sneaker"
import type { IFilter } from "@/types/filters"
import type { IParams } from "@/types/params"
import type { IFavoriteSneaker } from "@/types/favorites"

const { scrollbarWidth } = storeToRefs(useScrollbarWidth())

const sneakers = ref<IFullSneaker[]>([])
const cart = ref<IFullSneaker[]>([])
const isDrawerOpen = ref(false)
const isLoading = ref(false)
const isOrderLoading = ref(false)

const filters = reactive<IFilter>({
  sortBy: "title",
  searchQuery: "",
})

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

const addToCart = (sneakerForCart: IFullSneaker) => {
  sneakerForCart.isAdded = true
  cart.value.push(sneakerForCart)
}

const removeFromCart = (sneakerForCart: IFullSneaker) => {
  const isSneakerAddedToCart = cart.value.find(
    (item) => item.id === sneakerForCart.id
  )

  if (isSneakerAddedToCart) {
    cart.value.splice(cart.value.indexOf(isSneakerAddedToCart), 1)
    sneakerForCart.isAdded = false
  }
}

const handleCart = (sneakerForCart: IFullSneaker) => {
  sneakerForCart.isAdded
    ? removeFromCart(sneakerForCart)
    : addToCart(sneakerForCart)
}

const createOrder = async () => {
  isOrderLoading.value = true
  try {
    const { data } = await axios.post(
      `https://94b7cd2ddefb8133.mokky.dev/orders`,
      {
        items: cart.value,
        totalPrice: totalPrice.value,
      }
    )

    cart.value = []
    sneakers.value.forEach((sneaker) => {
      sneaker.isAdded = false
    })

    return data
  } catch (error) {
    console.log(error)
  } finally {
    isOrderLoading.value = false
  }
}

const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const totalPrice = computed(() => {
  return cart.value
    ? cart.value.reduce((acc, curVal) => acc + curVal.price, 0)
    : 0
})

onMounted(async () => {
  const savedCart = localStorage.getItem("cart")
  cart.value = savedCart ? JSON.parse(savedCart) : []

  await fetchItems()
  await fetchFavorites()

  sneakers.value.forEach(
    (sneaker) =>
      (sneaker.isAdded = cart.value.some(
        (cartItem) => cartItem.id === sneaker.id
      ))
  )
})

watch(filters, async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(isDrawerOpen, (newValue) => {
  handleScrollPadding(newValue)
})

watch(
  cart,
  () => {
    localStorage.setItem("cart", JSON.stringify(cart.value))
  },
  { deep: true }
)

provide("cart", { cart, removeFromCart })
</script>
