import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/ProductInterface";
import ProductList from "./ProductList";

function Catalog() {


    const [products, setproducts] = useState<Product[]>([]);
  
    useEffect(()=>{
      fetch("http://localhost:5000/api/Products")
      .then(retorno=> retorno.json())
      .then((items) => setproducts(items))
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