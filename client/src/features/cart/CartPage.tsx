import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { agents } from "../../app/api/agent";
import { Cart } from "../../interfaces/Cart.interface";
import DeleteIcon from "@mui/icons-material/Delete"

function CartPage() {

    const [loading, setloading] = useState(true);
    const [cart, setcart] = useState<Cart | null>(null);

    useEffect(() => {
        agents.Cart.get()
            .then(cartList => setcart(cartList))
            .catch(err => console.log)
            .finally(() => setloading(false))
    }, [])


    return (
        <>
            {loading ? <h1>Loading...</h1>
                : (

                    !cart ?
                        <Typography>Your Cart is Empty</Typography>
                        : (


                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
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
                                                    {row.name}
                                                </TableCell>

                                                <TableCell align="right">
                                                    {`${Intl.NumberFormat("pt-BR", {
                                                        style: "currency",
                                                        currency: "BRL"
                                                    })
                                                        .format(row.price / 100)}`}</TableCell>

                                                <TableCell align="right">{row.quantity}</TableCell>

                                                <TableCell align="right">{`${Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL"
                                                })
                                                    .format((row.price / 100) * row.quantity)}`}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton aria-label="delete" color="error">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                )}
        </>
    );
}

export default CartPage;