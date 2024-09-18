export interface ISneaker {
  id: number
  title: string
  price: number
  imageUrl: string
}

export interface IFullSneaker extends ISneaker {
  isFavorite: boolean
  isAdded: boolean
  favoriteId?: number
}
