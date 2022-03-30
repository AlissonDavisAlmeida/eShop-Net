import { Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Product } from '../../interfaces/ProductInterface';
import './App.css';
import Header from './Header';



function App(props : any) {
  
  const [products, setproducts] = useState<Product[]>([]);
  
  useEffect(()=>{
    fetch("http://localhost:5000/api/Products")
    .then(retorno=> retorno.json())
    .then((items) => setproducts(items))
  }, [])


  return (
    <>
    <Header  children={props.children}/>
    <Container maxWidth="lg">

    <Catalog products={products}/>
    </Container>
    </>
  );
}

export default App;
