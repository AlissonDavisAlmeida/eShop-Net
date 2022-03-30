import { Grid, List } from "@mui/material";
import { Product } from "../../interfaces/ProductInterface";
import ProductCart from "./ProductCart";

interface ProductListProps {
    products: Product[]
}

function ProductList(props: ProductListProps) {
    return (
        <>
            <List >
                <Grid container spacing={3}>

                    {props.products.map((product) => (
                        <Grid key={product.id} item xs={4} lg={2} sm={3} xl={2} md={2}>

                        <ProductCart  product={product} />
                        </Grid>
                    ))}
                </Grid>
            </List>
        </>
    );
}

export default ProductList;