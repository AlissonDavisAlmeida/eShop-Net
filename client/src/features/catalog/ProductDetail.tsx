import style from "../../styles/ProductDetail.module.css";

import { Backdrop, Box, CircularProgress, Container, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addCartItemAsync, removeCartItemAsync } from "../../store/slices/cart/cartSlice";
import { fetchAsyncProduct, productSelector } from "../../store/slices/catalog/catalog_slice";


function ProductDetail() {

    const { id } = useParams<{ id: string }>()
    const product = useAppSelector(state => productSelector.selectById(state, id))
    const {status : loading} = useAppSelector(state => state.catalog)
    const [quantity, setquantity] = useState(0);


    const dispatch = useAppDispatch()
    const { cart, status } = useAppSelector(state => state.cart)

    const item = cart?.items.find(item => item.productID === product?.id)

    useEffect(() => {

        if (item) {
            setquantity(item.quantity)
        }

        if(!product){
            dispatch(fetchAsyncProduct(+id))
        }
    }, [item, dispatch, product])

    const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (+event.target.value >= 0) {

            setquantity(+event.target.value)
        }
    }

    const handleUpdateCart = () => {

        if (!item || quantity > item.quantity) {
            const updateQuantity = item ? quantity - item.quantity : quantity
            dispatch(addCartItemAsync({ productId: product?.id!, quantity: updateQuantity }))
        } else {
            const updateQuantity = item.quantity - quantity
            dispatch(removeCartItemAsync({ productId: product?.id!, quantity: updateQuantity }))
        }
    }

    return (
        <Container maxWidth="lg">
            {loading.includes("pending") ? (
                <Backdrop open={true} invisible={true}>

                    <Box height={"100vh"} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                        <CircularProgress size={100} />
                    </Box>
                </Backdrop>
            ) : product?.id ? (
                <Grid container spacing={6} padding={10}>
                    <Grid item xs={6}>
                        <img className={style.imgDetail} src={product?.pictureUrl} alt={product?.name} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h3">{product?.name}</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="h4" color="secondary">
                            {"R$" + ((product?.price || 0) / 100).toFixed(2)}
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>

                                        <TableCell align="left" >Name</TableCell>
                                        <TableCell align="right">{product?.name}</TableCell>
                                    </TableRow>
                                    <TableRow>

                                        <TableCell align="left">Description</TableCell>
                                        <TableCell align="right">{product?.description}</TableCell>
                                    </TableRow>
                                    <TableRow>

                                        <TableCell align="left">Type</TableCell>
                                        <TableCell align="right">{product?.type}</TableCell>
                                    </TableRow>
                                    <TableRow>

                                        <TableCell align="left">Brand</TableCell>
                                        <TableCell align="right">{product?.brand}</TableCell>
                                    </TableRow>
                                    <TableRow>

                                        <TableCell align="left">Quantity</TableCell>
                                        <TableCell align="right">{product?.quantityInStock}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container spacing="2">
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    label="Quantity in Cart"
                                    fullWidth
                                    value={quantity}
                                    onChange={event => handleChangeQuantity(event)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {quantity > 0 && (

                                    <LoadingButton
                                        sx={{ height: "55px" }}
                                        loading={status.includes(`pending ${product.id}`)}
                                        disabled={item?.quantity === quantity}
                                        color="primary"
                                        size="large"
                                        variant="contained"
                                        fullWidth
                                        onClick={handleUpdateCart}
                                    >
                                        {item ? "Update Quantity" : "Add to Cart"}
                                    </LoadingButton>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ) : <NotFound />}
        </Container>
    );
}

export default ProductDetail;