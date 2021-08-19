import React, { useState } from 'react'
import { Box, Button, Divider, Grid, TextField, Typography } from '@material-ui/core'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { newProduct, ProductInfo, Seller } from '../baemin/Baemin';
import { PrivateRouteProps } from '../baemin/BaeminHooks';

interface AddProductPageProps extends PrivateRouteProps {

}

export default function AddProductPage(props: AddProductPageProps) {
    const auth = props.auth;
    const history = useHistory();
    const location = useLocation();
    const seller = location.state as Seller;
    const [data, setData] = useState<ProductInfo>({});
    
    if(seller.account.id !== auth.id) {
        return <Redirect to="/invalid"/>
    }

    const onChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleCreate = (e: any) => {
        e.preventDefault();
        newProduct(seller, data)
            .then(res => {
                history.push('/account/product', res.data)
            })
            .catch(reason => {
                alert(reason);
            })
    }

    return (
        <>
            <Typography variant="h6">New Product</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            <form onSubmit={handleCreate}>
                <Box my={2}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <TextField autoFocus required variant="outlined" name="code" label="Code" onChange={onChange} fullWidth/>
                        </Grid>
                        <Grid item>
                            <TextField required variant="outlined" name="title" label="Title" onChange={onChange} fullWidth/>
                        </Grid>
                        <Grid item>
                            <TextField required variant="outlined" name="description" label="Description" onChange={onChange} fullWidth/>
                        </Grid>
                        <Grid item>
                            <TextField required variant="outlined" name="price" type="number" label="Price" onChange={onChange} fullWidth/>
                        </Grid>
                        <Grid item>
                            <TextField required variant="outlined" name="quantity" type="number" label="Quantity" onChange={onChange} fullWidth/>
                        </Grid>
                    </Grid>
                </Box>
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </>
    )
}