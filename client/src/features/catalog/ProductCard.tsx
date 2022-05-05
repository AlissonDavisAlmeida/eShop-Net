import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../interfaces/ProductInterface";

interface ProductCardProps {
    product: Product
}

function ProductCart({ product }: ProductCardProps) {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardHeader avatar={
                <Avatar sx={{ backgroundColor: "warning.main" }}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>

            } title={product.name} titleTypographyProps={{
                sx: { fontWeight: "bold", color: "primary.main" }
            }} />
            <CardMedia sx={{ height: 140, backgroundSize: "contain", backgroundColor:"#93bde8" }} image={product.pictureUrl} />
            <CardContent>
                <Typography gutterBottom color={"cadetblue"} variant="h5">
                    {`R$ ${parseFloat((product.price / 100).toFixed(2)).toLocaleString("pt-BR", {
                        currency: "BRL",
                        minimumFractionDigits: 2
                    })}`}
                </Typography>
                <Typography color={"darkgrey"} variant="body2">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Adicionar</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">Detalhes</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCart;