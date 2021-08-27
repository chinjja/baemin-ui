import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { addToCart, Product } from "../baemin/Baemin";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { useAuth } from "../baemin/BaeminHooks";

export default function ProductPage() {
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const product = location.state as Product;

    const handleAddToCart = () => {
        addToCart(auth!, product)
        .then(_ => {
            alert("장바구니에 추가되었습니다.")
        })
        .catch(reason => {
            alert(reason);
        })
    };

    const handleGoToCart = () => {
        history.push("/account/cart", auth!);
    };

    const inputProps = {
        readOnly: true,
    }

    return (
        <>
            <Typography variant="h6">Details of Product</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            <Box my={2}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <TextField fullWidth label="Seller" variant="outlined" value={product.seller.name} disabled></TextField>
                    </Grid>
                    <Grid item>
                        <Divider/>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Code" variant="outlined" value={product.code} InputProps={inputProps}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Title" variant="outlined" value={product.title} InputProps={inputProps}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Description" variant="outlined" value={product.description} InputProps={inputProps}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Price" variant="outlined" value={product.price} InputProps={inputProps}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Quantity" variant="outlined" value={product.quantity} InputProps={inputProps}></TextField>
                    </Grid>
                </Grid>
            </Box>
            {auth && <Grid container spacing={1}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to cart</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleGoToCart}>Go to cart</Button>
                </Grid>
            </Grid>}
        </>
    );
}