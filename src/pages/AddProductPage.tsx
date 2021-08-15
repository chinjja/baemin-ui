import React, { useState } from 'react'
import { Box, Button, Divider, TextField, Typography } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { newProduct, ProductInfo, Seller } from '../baemin/Baemin';

export default function AddProductPage() {
    const history = useHistory();
    const location = useLocation();
    const seller = location.state as Seller;
    const [data, setData] = useState<ProductInfo>({});
    
    const onChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleCreate = (e: any) => {
        e.preventDefault();
        newProduct(seller, data)
            .then(_ => {
                history.goBack();
            })
            .catch(reason => {
                alert(reason.message);
            })
    }

    return (
        <>
            <Typography variant="h6">New Product</Typography>
            <Box my={1}>
                <Divider/>
            </Box>
            <form onSubmit={handleCreate}>
                <Box mb={1}>
                    <TextField name="code" label="Code" onChange={onChange} fullWidth/>
                    <TextField name="title" label="Title" onChange={onChange} fullWidth/>
                    <TextField name="description" label="Description" onChange={onChange} fullWidth/>
                    <TextField name="price" type="number" label="Price" onChange={onChange} fullWidth/>
                    <TextField name="quantity" type="number" label="Quantity" onChange={onChange} fullWidth/>
                </Box>
                <Button type="submit" variant="outlined">Create</Button>
            </form>
        </>
    )
}