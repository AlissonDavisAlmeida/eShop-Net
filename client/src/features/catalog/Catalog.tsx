import { Box, Button } from "@mui/material";
import { Product } from "../../interfaces/ProductInterface";
import ProductList from "./ProductList";

interface CatalogProps {
    products: Product[]
}

function Catalog(props: CatalogProps) {
    return (
        <div className="App">
            <Box >
                <nav>
                   <ProductList products={props.products}/>
                    
                </nav>
            </Box>
            
        </div>
    );
}


export default Catalog;