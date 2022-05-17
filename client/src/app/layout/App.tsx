import { Container, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { useState } from 'react';
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
import { Home } from '@mui/icons-material';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';
import CartPage from '../../features/cart/CartPage';


function App(props: any) {

  const [dark, setdark] = useState(false);

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
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right'/>
        <Header children={props.children} setTheme={setTheme} dark={dark} />
        <Container maxWidth="lg">
          <Switch>

            <Route  exact path='/' component={HomePage} />
            <Route exact path='/catalog' component={Catalog} />
            <Route  path='/catalog/:id' component={ProductDetail} />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={ContactPage} />
            <Route path='/cart' component={CartPage} />
            <Route path="/server-error" component={ServerError } />
            <Route  path={"*"} component={NotFound } />
          </Switch>
          
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
