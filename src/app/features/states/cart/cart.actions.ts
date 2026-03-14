//here u can mak cart actione

import { createAction } from "@ngrx/store";

export const addToCart = createAction('Added');

export const removeFromCart = createAction('Removed');

export const clearCart = createAction('cleared');
