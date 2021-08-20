import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Product, updateProduct } from "../baemin/Baemin";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { PrivateRouteProps } from "../baemin/BaeminHooks";

interface AccountProductPageProps extends PrivateRouteProps {

}

export default function AccountProductPage(props: AccountProductPageProps) {
    const auth = props.auth;
    const location = useLocation();
    const [product, setProduct] = useState(location.state as Product);

    if(product.seller.account.id !== auth.id) {
        return <Redirect to="/invalid"/>
    }
    
    const handleModify = (e: any) => {
        e.preventDefault();
        updateProduct(product, product)
        .then(res => setProduct(res.data!))
        .catch(reason => alert(reason))
    }

    const onChange = (e: any) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }
    
    return (
        <>
            <Typography variant="h6">Details of Product</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            <form onSubmit={handleModify}>
                <Box my={2}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <TextField fullWidth label="ID" variant="outlined" defaultValue={product.id} InputProps={{readOnly: true}} disabled></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth name="code" label="Code" variant="outlined" defaultValue={product.code} InputProps={{readOnly: true}} disabled></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth name="title" label="Title" variant="outlined" onChange={onChange} defaultValue={product.title}></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth name="description" label="Description" variant="outlined" onChange={onChange} defaultValue={product.description}></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth name="price" label="Price" variant="outlined" type="number" onChange={onChange} defaultValue={product.price}></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth name="quantity" label="Quantity" variant="outlined" type="number" onChange={onChange} defaultValue={product.quantity}></TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Button type="submit" variant="contained" color="primary">Modify</Button>
            </form>
        </>
    );
}