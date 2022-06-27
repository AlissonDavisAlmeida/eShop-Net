import { Grid } from "@mui/material";
import React from "react";
import { Product } from "../../interfaces/ProductInterface";
import ProductCard from "./ProductCard";

interface ProductListProps {
    products: Product[]
}

function ProductList(props: ProductListProps) {
    return (
        <>

            <Grid container spacing={4}>

                {props.products.map((product) => (
                    <Grid key={product.id} item xs={6}  sm={4}>

                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>

        </>
    );
}

export default ProductList;