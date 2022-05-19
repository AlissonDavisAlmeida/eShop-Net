import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { formatCurrencies } from "../../app/util/util";

export default function CartSummary() {

    

    const { cart } = useStoreContext()

    let subtotal = cart?.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0
    const deliveryFee = subtotal/100 > 100 ? 0 : 10
    
    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">
                            {
                                formatCurrencies(subtotal/100)
                            }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">
                            {
                                formatCurrencies(deliveryFee)
                            }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">
                            {
                                formatCurrencies(subtotal/100 + deliveryFee)
                            }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over R$100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}