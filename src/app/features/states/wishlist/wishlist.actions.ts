import { createAction, props } from "@ngrx/store";

export const addToWishlist = createAction(
  '[Wishlist] Add',
  props<{ item: any }>()
);

export const removeFromWishlist = createAction(
  '[Wishlist] Remove',
  props<{ id: number }>()
);