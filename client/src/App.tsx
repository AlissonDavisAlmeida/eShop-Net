import { useState, useEffect } from 'react';
import './App.css';

interface Product{
  id : number
  name : string
  description : string
  price: number
  pictureUrl: string
  type: string
  brand: string
  quantityInStock: number
}

function App() {
  
  const [products, setproducts] = useState<Product[]>([]);
  
  useEffect(()=>{
    fetch("http://localhost:5000/api/Products")
    .then(retorno=> retorno.json())
    .then((items) => setproducts(items))
  }, [])


  return (
    <div className="App">
      <ul>
        {products.map((product)=>(
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
