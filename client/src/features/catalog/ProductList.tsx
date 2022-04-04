import { Grid } from "@mui/material";
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
                        <Grid  key={product.id} item xs={6} lg={3} sm={4} md={3}>

                        <ProductCard  product={product} />
                        </Grid>
                    ))}
                </Grid>
            
        </>
    );
}

export default ProductList;