import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
    
    
    return ( 
        <Container component={Paper} sx={{height:400}}>
            <Typography gutterBottom variant="h3">Oooops - We could not find what are you looking for</Typography>
            <Divider/>

            <Button fullWidth component={Link} to="/catalog">Go Back</Button>
        </Container>
     );
}

export default NotFound;