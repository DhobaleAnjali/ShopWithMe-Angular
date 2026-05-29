//here u can mak cart actione

import { createAction, props } from "@ngrx/store";

export const addToCart = createAction(
  '[Cart] Add',
  props<{ item: any }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove',
  props<{ id: number }>()
);

export const clearCart = createAction(
  '[Cart] Clear'
);
