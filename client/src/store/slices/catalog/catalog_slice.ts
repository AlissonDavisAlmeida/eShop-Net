import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { agents } from "../../../app/api/agent";
import { Product } from "../../../interfaces/ProductInterface";

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductAsync = createAsyncThunk<Product[]>("catalog/fetchProductAsync", async (_, thunkAPI) => {
    try {
        return await agents.Catalog.list()

    } catch (err: any) {
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


export const fetchFilters = createAsyncThunk(
    "catalog/fetchFilters",
    async (_, thunkAPI) => {
        try {
            return await agents.Catalog.fetchFilters()
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.data
            })
        }
    }
)



export const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: "idle",
        filtersLoaded: false,
        brands: [],
        types: []
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
            state.status = "idle"
        })

        builder.addCase(fetchFilters.pending, (state) => {
            state.status = "pending"
        })

        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands
            state.types = action.payload.types
            state.filtersLoaded = true
            state.status = "idle"
        })

        builder.addCase(fetchFilters.rejected, (state) => {
            state.status = "idle"
        })

    })


})

export const productSelector = productsAdapter.getSelectors((state: RootState) => state.catalog)