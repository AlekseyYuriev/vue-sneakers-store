export interface IFavoriteSneakerServerData {
  id: number
  item: {
    id: number
    title: string
    price: number
    imageUrl: string
  }
}

export interface itemIdObj {
  item_id: number
}

export interface favoriteSneakerItemId {
  id: number
  item_id: number
}
