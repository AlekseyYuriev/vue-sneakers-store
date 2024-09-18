<template>
  <!-- <AppDrawer /> -->

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <AppHeader />

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

      <AppCardList :sneakers="sneakers" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue"
import axios from "axios"
import AppHeader from "@/components/AppHeader.vue"
import AppCardList from "@/components/AppCardList.vue"
import AppDrawer from "@/components/AppDrawer.vue"
import type { ISneaker } from "./types/sneaker"
import type { IFilter } from "./types/filters"
import type { IParams } from "./types/params"

const sneakers = ref<ISneaker[]>([])

const filters = reactive<IFilter>({
  sortBy: "title",
  searchQuery: "",
})

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

    sneakers.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchItems)

watch(filters, fetchItems)
</script>
