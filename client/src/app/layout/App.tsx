import { Container, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetail from '../../features/catalog/ProductDetail';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import './App.css';
import Header from './Header';

import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';
import CartPage from '../../features/cart/CartPage';
import { getCookie } from '../util/util';
import { agents } from '../api/agent';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import { setCart } from '../../store/slices/cart/cartSlice';
import { useAppDispatch } from '../../store/hooks';


function App(props: any) {

  
  const dispatch = useAppDispatch()
  const [dark, setdark] = useState(false);
  const [loading, setloading] = useState(true);


  useEffect(() => {

    const buyerID = getCookie("buyerID")
    console.log(buyerID)
    if (buyerID) {
      agents.Cart.get()
        .then(cart => dispatch(setCart(cart)))
        .finally(() => setloading(false))
    } else {
      setloading(false)
    }
  }, [dispatch])

  const theme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
      background: {
        default: dark ? '#121212' : '#e5eff8'
      }
    }
  })

  const setTheme = () => {
    setdark(!dark)
  }



  return (
    <>
      {loading ? <h1>Loading...</h1>

        : (

          <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-right' />
            <Header children={props.children} setTheme={setTheme} dark={dark} />
            <Container maxWidth="lg">
              <Switch>

                <Route exact path='/' component={HomePage} />
                <Route path='/cart' component={CartPage} />
                <Route exact path='/catalog' component={Catalog} />
                <Route path='/catalog/:id' component={ProductDetail} />
                <Route path='/about' component={AboutPage} />
                <Route path='/contact' component={ContactPage} />
                <Route path="/server-error" component={ServerError} />
                <Route path={"/checkout"} component={CheckoutPage} />
                <Route path={"*"} component={NotFound} />
              </Switch>

            </Container>
          </ThemeProvider>
        )}
    </>
  );
}

export default App;
