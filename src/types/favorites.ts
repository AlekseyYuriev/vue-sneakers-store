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
