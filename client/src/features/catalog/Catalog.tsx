import { Box } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductAsync, productSelector } from "../../store/slices/catalog/catalog_slice";
import ProductList from "./ProductList";

function Catalog() {


    const products = useAppSelector(productSelector.selectAll)
    const { productsLoaded } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()

    useEffect(() => {
      if(!productsLoaded) {
        dispatch(fetchProductAsync())
      }
    }, [])



    return (
        <div className="App">
            <Box >
                <nav>
                    <ProductList products={products} />

                </nav>
            </Box>

        </div>
    );
}


export default Catalog;