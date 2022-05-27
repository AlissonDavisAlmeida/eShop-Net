import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../../interfaces/Cart.interface";


interface CartState {
    cart: Cart | null

}

const initialState: CartState = {
    cart: null
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            console.log(action)
            state.cart = action.payload
        },
        removeItem: (state, action) => {
            const { productID, quantity } = action.payload
            if (!state.cart) return

            const items = state.cart.items

            const itemIndex = items.findIndex(i => i.productID === productID)

            if (itemIndex === -1 || itemIndex === undefined) return

            if (itemIndex >= 0) {

                items[itemIndex].quantity -= quantity
                if (items[itemIndex].quantity === 0) {
                    items.splice(itemIndex, 1)
                    return
                }



            }


        }
    }
})


export const { setCart, removeItem } = cartSlice.actions