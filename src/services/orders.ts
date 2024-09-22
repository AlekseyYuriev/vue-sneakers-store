import axios from "axios"
import type { IFullSneaker } from "@/types/sneaker"

export const createOrder = async (
  items: IFullSneaker[],
  totalPrice: number
) => {
  try {
    const { data: order } = await axios.post(
      `https://94b7cd2ddefb8133.mokky.dev/orders`,
      {
        items,
        totalPrice,
      }
    )

    return order
  } catch (error) {
    console.log(error)
  }
}
