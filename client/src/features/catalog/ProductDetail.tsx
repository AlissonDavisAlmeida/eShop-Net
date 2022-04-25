import style from "../../styles/ProductDetail.module.css";

import { Box, Container, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../interfaces/ProductInterface";
import { agents } from "../../app/api/agent";


function ProductDetail() {

    const { id } = useParams<{ id: string }>()
    const [product, setproduct] = useState<Product>();
    const [loading, setloading] = useState(false);

    useEffect(() => {

        setloading(true)
        agents.Catalog.details(id? +id : 0)
            .then(productDetail => setproduct(productDetail))
            .catch(erro => {
                console.log(erro)
            })
            .finally(() => {
                setloading(false)

            })
    }, [])

    return (
        <Container maxWidth="lg">
            {loading ? (
                <Box>
                    <h3>Carregando...</h3>
                </Box>
            ) : (
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
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}

export default ProductDetail;