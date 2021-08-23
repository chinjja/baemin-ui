import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { entity, getProduct, Product, ProductInfo, updateProduct } from "../baemin/Baemin";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { PrivateRouteProps } from "../baemin/BaeminHooks";

interface AccountProductPageProps extends PrivateRouteProps {

}

export default function AccountProductPage(props: AccountProductPageProps) {
    const auth = props.auth;
    const location = useLocation();
    const origin = location.state as Product;
    const [product, setProduct] = useState(entity(origin));
    const [dto, setDto] = useState<ProductInfo>({});
    
    useEffect(() => {
        getProduct(origin.id)
        .then(res => setProduct(res))
        .catch(reason => alert(reason))
    }, [origin])

    const handleModify = (e: any) => {
        e.preventDefault();
        updateProduct(product, dto)
        .then(res => setProduct(res))
        .catch(reason => alert(reason))
    }

    const onChange = (e: any) => {
        setDto({
            ...dto,
            [e.target.name]: e.target.value
        })
    }
    
    if(product.data.seller.account.id !== auth.id) {
        return <Redirect to="/invalid"/>
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
                            <TextField fullWidth label="ID" variant="outlined" defaultValue={product.data.id} InputProps={{readOnly: true}} disabled></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth name="code" label="Code" variant="outlined" defaultValue={product.data.code} InputProps={{readOnly: true}} disabled></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth name="title" label="Title" variant="outlined" onChange={onChange} defaultValue={product.data.title}></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth name="description" label="Description" variant="outlined" onChange={onChange} defaultValue={product.data.description}></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth name="price" label="Price" variant="outlined" type="number" onChange={onChange} defaultValue={product.data.price}></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth name="quantity" label="Quantity" variant="outlined" type="number" onChange={onChange} defaultValue={product.data.quantity}></TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Button type="submit" variant="contained" color="primary">Modify</Button>
            </form>
        </>
    );
}