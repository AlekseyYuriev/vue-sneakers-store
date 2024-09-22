import axios from "axios"
import type { IParams } from "@/types/params"
import type { IFullSneaker, ISneaker } from "@/types/sneaker"
import type { IFilter } from "@/types/filters"
import type {
  favoriteSneakerItemId,
  IFavoriteSneakerServerData,
  itemIdObj,
} from "@/types/favorites"

export const getAllSneakers = async (
  filters: IFilter
): Promise<IFullSneaker[] | undefined> => {
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

export const getFavoriteSneakersItemId = async (): Promise<
  favoriteSneakerItemId[] | undefined
> => {
  try {
    const { data: favorites } = await axios.get(
      "https://94b7cd2ddefb8133.mokky.dev/favorites"
    )

    return favorites
  } catch (error) {
    console.log(error)
  }
}

export const addSneakerToFavorites = async (
  itemIdObj: itemIdObj
): Promise<favoriteSneakerItemId | undefined> => {
  try {
    const { data } = await axios.post(
      `https://94b7cd2ddefb8133.mokky.dev/favorites`,
      itemIdObj
    )

    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteSneakerFromFavorites = async (id: number): Promise<void> => {
  try {
    await axios.delete(`https://94b7cd2ddefb8133.mokky.dev/favorites/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export const getAllFavoriteSneakers = async (): Promise<
  IFavoriteSneakerServerData[] | undefined
> => {
  try {
    const { data } = await axios.get(
      "https://94b7cd2ddefb8133.mokky.dev/favorites?_relations=items"
    )

    return data
  } catch (error) {
    console.log(error)
  }
}
