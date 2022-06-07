import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { agents } from "../../../app/api/agent";
import { Product } from "../../../interfaces/ProductInterface";

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductAsync = createAsyncThunk<Product[]>("catalog/fetchProductAsync", async (_, thunkAPI) => {
    try {
        return await agents.Catalog.list()

    } catch (err:any) {
        return thunkAPI.rejectWithValue({
            error: err.data
        })
    }
})

export const fetchAsyncProduct =
     createAsyncThunk<Product, number>("catalog/fetchProduct", async (productId: number, thunkAPI) => {
    try {
        return await agents.Catalog.details(productId)

    } catch (err: any) {
        return thunkAPI.rejectWithValue({
            error: err.data
        })
    }
})

export const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: "idle",

    }),
    reducers: {

    },
    extraReducers: (builder => {
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload),
                state.status = "idle"
            state.productsLoaded = true
        })
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = "idle"
        })


        builder.addCase(fetchAsyncProduct.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(fetchAsyncProduct.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload),
            state.status = "idle"
        })
        builder.addCase(fetchAsyncProduct.rejected, (state, action) => {
            console.log(action)
            state.status = "idle"
        })
    })


})

export const productSelector = productsAdapter.getSelectors((state: RootState) => state.catalog)