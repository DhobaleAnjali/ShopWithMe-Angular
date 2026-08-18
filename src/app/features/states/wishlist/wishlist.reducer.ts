import { createReducer, on } from "@ngrx/store";
import { addToWishlist, removeFromWishlist } from "./wishlist.actions";

export const initialWishlistState: any[] = []; // this should be wishlist array items so that it give an new array object and then we can count based on existing and new cart items

export const wishlistReducer = createReducer(
  initialWishlistState,

  on(addToWishlist, (state, { item }) => {
    debugger
    return [...state, item];
  }),
  );