import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { agents } from "../../app/api/agent";
import { Product } from "../../interfaces/ProductInterface";
import ProductList from "./ProductList";

function Catalog() {


    const [products, setproducts] = useState<Product[]>([]);
  
    useEffect(()=>{
      agents.Catalog.list()
      .then((listProducts)=> setproducts(listProducts))
    }, [])

    return (
        <div className="App">
            <Box >
                <nav>
                   <ProductList products={products}/>
                    
                </nav>
            </Box>
            
        </div>
    );
}


export default Catalog;