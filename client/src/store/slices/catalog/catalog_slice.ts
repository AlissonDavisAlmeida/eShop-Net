import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { agents } from "../../../app/api/agent";
import { Product, ProductParams } from "../../../interfaces/ProductInterface";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string
    brands: string[];
    types: string[]
    productParams: ProductParams;

}


const productsAdapter = createEntityAdapter<Product>()

const getAxiosParams = (productParams: ProductParams) => {
    const params = new URLSearchParams()
    params.append("pageNumber", productParams.pageNumber.toString())
    params.append("pageSize", productParams.pageSize.toString())
    params.append("orderBy", productParams.orderBy!)
    if(productParams.searchTerm)  params.append("searchTerm", productParams.searchTerm)
    productParams.brands && params.append("brands", productParams.brands.toString())
    productParams.types && params.append("types", productParams.types.toString())

    return params
}

export const fetchProductAsync = createAsyncThunk<Product[], void, {state: RootState}>
    ("catalog/fetchProductAsync", async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams)

        try {
            return await agents.Catalog.list(params)

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

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: "name"
    }
}

export const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        status: "idle",
        filtersLoaded: false,
        brands: [],
        types: [],
        productParams: initParams()
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false
            state.productParams = { ...state.productParams, ...action.payload }
        },
        resetProductParams: (state, action) => {
            state.productParams = initParams()
        }
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

export const { resetProductParams, setProductParams } = catalogSlice.actions