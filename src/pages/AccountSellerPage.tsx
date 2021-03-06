import React, { useState } from "react";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { Seller, SellerInfo, updateSeller } from "../baemin/Baemin"
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { PrivateRouteProps, useProducts } from "../baemin/BaeminHooks";

interface AccountSellerPageProps extends PrivateRouteProps {

}

export default function AccountSellerPage(props: AccountSellerPageProps) {
    const auth = props.auth;
    const history = useHistory();
    const location = useLocation();
    const [seller, setSeller] = useState(location.state as Seller);
    const products = useProducts(seller);
    const [data, setData] = useState<SellerInfo>({});

    if(seller.account.id !== auth.id) {
        return <Redirect to="/invalid"/>
    }
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'code', headerName: 'Code', flex: 1},
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'price', headerName: 'Price', type: 'number', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1 },
    ]

    const rows = products.map(row => {
        return {
            ...row,
        }
    })

    const handleAddProduct = () => {
        history.push("/account/product/add", seller);
    }

    const onChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleModifySeller = () => {
        updateSeller(seller, data)
        .then(res => setSeller(res.data!))
        .catch(reason => alert(reason))
    }

    return (
        <>
            <Typography variant="h6">Details of seller</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            <Box my={2}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <TextField fullWidth name="id" label="ID" variant="outlined" defaultValue={seller.id} disabled></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth name="name" label="Name" variant="outlined" defaultValue={seller.name} onChange={onChange}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth name="description" label="Description" variant="outlined" defaultValue={seller.description} onChange={onChange}></TextField>
                    </Grid>
                </Grid>
            </Box>
            <Button variant="contained" color="primary" onClick={handleModifySeller}>Modify</Button>
            <Box my={2}>
                <Divider/>
            </Box>
            <Box my={2}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    disableColumnMenu
                    disableSelectionOnClick
                    onRowClick={e=>history.push("/account/product", e.row)}
                    />
            </Box>
            <Button variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>
        </>
    );
}