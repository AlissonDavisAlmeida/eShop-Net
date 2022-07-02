import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setProductParams } from "../../store/slices/catalog/catalog_slice";

function ProductSearch() {

    const { productParams } = useAppSelector(state => state.catalog)
    const [searchTerm, setsearchTerm] = useState(productParams.searchTerm)
    const dispatch = useAppDispatch()

    const debounceSearch = debounce((event: any)=>{
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000)

    return (
        <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            value={searchTerm || ""}
            onChange={e =>{
                setsearchTerm(e.target.value)
                debounceSearch(e)
            }}
            />
    );
}

export default ProductSearch;