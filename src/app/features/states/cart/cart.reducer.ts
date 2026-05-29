import { createReducer, on } from "@ngrx/store";
import { addToCart, clearCart, removeFromCart } from "./cart.actions";

export const initialCartState: any[] = []; // this should be cart array items so that it give an new array object and then we can count based on existing and new cart items

export const cartReducer = createReducer(
  initialCartState,

  on(addToCart, (state, { item }) => {
    debugger
    return [...state, item];
  }),

// on(removeFromCart, (state, { id }) =>{ 
//     return 0;
// }),

//   on(clearCart, () => [])
);

