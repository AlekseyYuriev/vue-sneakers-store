import axios from "axios"
import type { IParams } from "@/types/params"
import type { ISneaker } from "@/types/sneaker"
import type { IFilter } from "@/types/filters"

export const getAllSneakers = async (filters: IFilter) => {
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

    return data.map((item: ISneaker) => ({
      ...item,
      isFavorite: false,
      isAdded: false,
      favoriteId: null,
    }))
  } catch (error) {
    console.log(error)
  }
}
