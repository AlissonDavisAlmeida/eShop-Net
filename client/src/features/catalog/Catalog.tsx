import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../interfaces/ProductInterface";

interface CatalogProps {
    products: Product[]
}

function Catalog(props: CatalogProps) {
    return (
        <div className="App">
            <Box >
                <nav>
                    <List >
                        {props.products.map((product) => (
                            <ListItem key={product.id} sx={
                                {display:"flex", 
                            flexDirection:"column", 
                            justifyContent:"center"}}>
                               <ListItemAvatar>
                                   <Avatar src={product.pictureUrl} />
                               </ListItemAvatar>
                               <ListItemText>
                                   {product.name} - {product.price}
                               </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                    <Button variant="contained">Add Product</Button>
                </nav>
            </Box>
            
        </div>
    );
}


export default Catalog;