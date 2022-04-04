import { Container, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import './App.css';
import Header from './Header';




function App(props : any) {
  
 const [dark, setdark] = useState(false);
  
 const theme = createTheme({
   palette:{
     mode: dark? 'dark' : 'light',
     background:{
       default:dark ? '#121212' : '#e5eff8' 
     }
   }
 })

 const setTheme = ()=>{
   setdark(!dark)
 }
 


  return (
    <>
    <ThemeProvider theme={theme}>

    <Header  children={props.children} setTheme={setTheme} dark={dark}/>
    <Container maxWidth="lg">

    <Catalog/>
    </Container>
    </ThemeProvider>
    </>
  );
}

export default App;
