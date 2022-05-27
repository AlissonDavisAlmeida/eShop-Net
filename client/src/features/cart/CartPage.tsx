import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import { Add, Remove } from "@mui/icons-material";
import { agents } from "../../app/api/agent";
import CartSummary from "./CartSummary";
import { formatCurrencies } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeItem, setCart } from "../../store/slices/cart/cartSlice";

function CartPage() {
    const dispatch = useAppDispatch()

    const { cart } = useAppSelector(state => state.cart)

    const removeItemToCart = (productID: number, quantity: number = 1) => {

        agents.Cart.removeItem(productID, quantity)
            .then(() => dispatch(removeItem({productID, quantity})))
            .catch(err => console.log(err))
    }

    const addItemToCart = (productID: number) => {
        agents.Cart.addItem(productID, 1)
            .then(cart => dispatch(setCart(cart)))
            .catch(err => console.log(err))


    }

    return (
        <>
            {!cart ?
                <Typography>Your Cart is Empty</Typography>
                : (

                    <>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.items.map((row) => (
                                        <TableRow
                                            key={row.productID}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Box display="flex" alignItems="center">
                                                    <img src={row.pictureURL} alt={row.name} style={{ height: 50, marginRight: 10 }} />
                                                    <span>{row.name}</span>
                                                </Box>
                                            </TableCell>

                                            <TableCell align="right">
                                                {
                                                    formatCurrencies(row.price / 100)
                                                }
                                            </TableCell>

                                            <TableCell align="center">
                                                <IconButton color="error" onClick={() => removeItemToCart(row.productID)}>
                                                    <Remove />
                                                </IconButton>

                                                {row.quantity}
                                                <IconButton color="primary" onClick={() => addItemToCart(row.productID)}>
                                                    <Add />
                                                </IconButton>
                                            </TableCell>

                                            <TableCell align="right">{`${Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "BRL"
                                            })
                                                .format((row.price / 100) * row.quantity)}`}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="delete" color="error"
                                                    onClick={() => removeItemToCart(row.productID, row.quantity)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Grid container>
                            <Grid item xs={6} />
                            <Grid item xs={6}>
                                <CartSummary />
                                <Button component={Link} to="/checkout" variant="contained" size="large" fullWidth >
                                    Checkout
                                </Button>
                            </Grid>

                        </Grid>


                    </>
                )
            }
        </>
    );
}

export default CartPage;