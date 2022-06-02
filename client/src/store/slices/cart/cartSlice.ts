import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { agents } from "../../../app/api/agent";
import { Cart } from "../../../interfaces/Cart.interface";


interface CartState {
    cart: Cart | null
    status: string
}

const initialState: CartState = {
    cart: null,
    status: "idle"
}


export const addCartItemAsync = createAsyncThunk<Cart, { productId: number, quantity: number }>(
    "cart/addCartItemAsync",
    async ({ productId, quantity }) => {
        try {
            return await agents.Cart.addItem(productId, quantity);
        } catch (err) {
            console.log(err);
        }
    }
)

export const removeCartItemAsync = createAsyncThunk<void, { productId: number, quantity: number }>(
    "cart/removeCartItemAsync",
    async ({ productId, quantity }) => {
        try {
            await agents.Cart.removeItem(productId, quantity);
        } catch (err) {
            console.log(err);
        }
    }
)

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            // console.log(action)
            state.cart = action.payload
        },
        
    },
    extraReducers: (builder => {
        builder.addCase(addCartItemAsync.pending, (state, action) => {
            console.log(action)
            state.status = "pending" + action.meta.arg.productId
        })
        builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
            state.cart = action.payload
            state.status = "idle"
        })
        builder.addCase(addCartItemAsync.rejected, (state) => {
            state.status = ""
        })
        builder.addCase(removeCartItemAsync.pending, (state, action) => {
            state.status = "pending " + action.meta.arg.productId

        })
        builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg
            if (!state.cart) return

            const items = state.cart.items

            const itemIndex = items.findIndex(i => i.productID === productId)

            if (itemIndex === -1 || itemIndex === undefined) return

            items[itemIndex].quantity -= quantity
            if (items[itemIndex].quantity === 0) {
                items.splice(itemIndex, 1)
                
            }
            state.status = "idle"
        })

        builder.addCase(removeCartItemAsync.rejected, (state, action) => {
            state.status = "idle"
        })
    })
})


export const { setCart } = cartSlice.actions