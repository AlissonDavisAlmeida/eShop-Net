import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Product } from '../../interfaces/ProductInterface';
import './App.css';



function App() {
  
  const [products, setproducts] = useState<Product[]>([]);
  
  useEffect(()=>{
    fetch("http://localhost:5000/api/Products")
    .then(retorno=> retorno.json())
    .then((items) => setproducts(items))
  }, [])


  return (
    <>
    <Typography variant="h1">E-Shop</Typography>
    <Catalog products={products}/>
    </>
  );
}

export default App;
