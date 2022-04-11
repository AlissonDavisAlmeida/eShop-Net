import { Container, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetail from '../../features/catalog/ProductDetail';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import './App.css';
import Header from './Header';




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

        <Header children={props.children} setTheme={setTheme} dark={dark} />
        <Container maxWidth="lg">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:id' element={<ProductDetail />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
