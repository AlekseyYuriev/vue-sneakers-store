export interface IFavoriteSneaker {
  id: number
  title: string
  price: number
  imageUrl: string
  item_id: number
}

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
  item_id: number
  id: number
}
