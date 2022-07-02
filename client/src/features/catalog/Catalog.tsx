import { Box, Checkbox, FormControl, FormControlLabel, 
        FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchFilters, fetchProductAsync, productSelector } from "../../store/slices/catalog/catalog_slice";
import ProductList from "./ProductList";
import ProductSearch from "./productSearch";

const sortOptions = [
    { value: "name", label: "Alphabetical" },
    { value: "priceDesc", label: "Price - High to Low" },
    { value: "priceAsc", label: "Price - Low to High" },
]

function Catalog() {


    const products = useAppSelector(productSelector.selectAll)
    const { productsLoaded, filtersLoaded, brands, types } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(products)
        if (!productsLoaded) {
            dispatch(fetchProductAsync())
        }
    }, [productsLoaded, dispatch])

    useEffect(() => {

        if (!filtersLoaded) {
            dispatch(fetchFilters())
        }
    }, [filtersLoaded, dispatch])

    return (

        <Grid container spacing={4}>
            <Grid item xs={3} >
                <Paper sx={{ mb: 2 }}>
                    <ProductSearch />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Order</FormLabel>
                        <RadioGroup>
                            {sortOptions.map(option => (

                                <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <FormGroup>
                        {brands.map(brand => (

                            <FormControlLabel control={<Checkbox />} label={brand} key={brand} />
                        ))}
                    </FormGroup>
                </Paper>

                <Paper sx={{ mb: 2, p: 2 }}>
                    <FormGroup>
                        {types.map(type => (

                            <FormControlLabel control={<Checkbox />} label={type} key={type} />
                        ))}
                    </FormGroup>
                </Paper>
            </Grid>
            <Grid item xs={9}>

                <ProductList products={products} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9}>
                <Box display="flex" justifyContent={"space-between"} alignItems="center">
                    <Typography>
                        Pagination
                    </Typography>
                    <Pagination
                        color="secondary"
                        count={10}
                        size="large"
                    />
                </Box>
            </Grid>
        </Grid>



    );
}


export default Catalog;