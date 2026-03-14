import { createReducer, on } from "@ngrx/store";
import { addToCart, clearCart, removeFromCart } from "./cart.actions";

export const initialCartState = 0; // this should be cart array items so that it give an new array object and then we can count based on existing and new cart items

export const cartReducer = createReducer(
    initialCartState,
    on(addToCart, ((state)=> state + 1)),

    on(removeFromCart, ((state)=> state - 1)),

    on(clearCart, (()=> 0))

)

