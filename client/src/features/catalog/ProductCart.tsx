import { Avatar, Card, CardContent, CardMedia, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../interfaces/ProductInterface";

interface ProductCartProps{
    product : Product
}

function ProductCart({product} : ProductCartProps) {
    return ( 
        <Card sx={{maxWidth: 400}}>
            <CardMedia component="img" height={"140"} image={product.pictureUrl}/>
            <CardContent>
                {product.name} - {product.price}
            </CardContent>
        </Card>
     );
}

export default ProductCart;