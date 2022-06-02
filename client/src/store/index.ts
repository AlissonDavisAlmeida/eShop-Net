import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cart/cartSlice";
import { catalogSlice } from "./slices/catalog/catalog_slice";



export const store = configureStore({
    reducer:{
        cart: cartSlice.reducer,
        catalog: catalogSlice.reducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch