import { toValue, type Ref } from "vue"
import type { IFullSneaker } from "@/types/sneaker"

export default function useCart() {
  function checkIfSneakerAddedToCart(
    sneakerArray: Ref<IFullSneaker[]>,
    cartArray: Ref<IFullSneaker[]>
  ) {
    toValue(sneakerArray).forEach(
      (sneaker) =>
        (sneaker.isAdded = toValue(cartArray).some(
          (cartItem) => cartItem.id === sneaker.id
        ))
    )
  }

  const handleCart = (
    sneakerForCart: IFullSneaker,
    cartArray: Ref<IFullSneaker[]>
  ) => {
    sneakerForCart.isAdded
      ? removeFromCart(sneakerForCart, cartArray)
      : addToCart(sneakerForCart, cartArray)
  }

  const addToCart = (
    sneakerForCart: IFullSneaker,
    cartArray: Ref<IFullSneaker[]>
  ) => {
    sneakerForCart.isAdded = true
    toValue(cartArray).push(sneakerForCart)
  }

  const removeFromCart = (
    sneakerForCart: IFullSneaker,
    cartArray: Ref<IFullSneaker[]>
  ) => {
    const isSneakerAddedToCart = toValue(cartArray).find(
      (item) => item.id === sneakerForCart.id
    )

    if (isSneakerAddedToCart) {
      toValue(cartArray).splice(
        toValue(cartArray).indexOf(isSneakerAddedToCart),
        1
      )
      sneakerForCart.isAdded = false
    }
  }

  return { checkIfSneakerAddedToCart, handleCart, addToCart, removeFromCart }
}
