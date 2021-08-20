import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { cancel, complete, Order } from "../baemin/Baemin";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useAuth, useOrderProducts } from "../baemin/BaeminHooks";

export default function OrderPage() {
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const [order, setOrder] = useState(location.state as Order);
    const products = useOrderProducts(order);

    const handleComplete = () => {
        complete(order)
        .then(res => setOrder(res.data!))
        .catch(reason => alert(reason))
    }

    const handleCancel = () => {
        cancel(order)
        .then(res => setOrder(res.data!))
        .catch(reason => alert(reason))
    }

    const columns: GridColDef[] = [
        { field: 'seller', headerName: 'Seller', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'price', headerName: 'Price', type: 'number', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1 },
    ]

    const rows = products.map(row => {
        return {
            ...row.product,
            ...row,
            seller: row.product.seller.name,
        }
    })

    const isOwner = order.account.id === auth?.id;

    return (
        <>
            <Typography variant="h6">Details of Order</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            
            <Box my={2}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <TextField fullWidth label="ID" variant="outlined" defaultValue={order.id} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Status" variant="outlined" defaultValue={order.status} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Date" variant="outlined" defaultValue={order.createdAt.toLocaleString()} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Buyer" variant="outlined" defaultValue={order.account.name} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                </Grid>
            </Box>
            <Divider/>
            <Box my={2}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    disableSelectionOnClick
                    disableColumnMenu
                    onRowClick={e=>history.push("/product", e.row.product)}
                    />
            </Box>
            {isOwner && <Grid container spacing={1}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleComplete} disabled={order.status !== "IN_PROGRESS" || undefined}>Complete</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleCancel} disabled={order.status !== "IN_PROGRESS" || undefined}>Cancel</Button>
                </Grid>
            </Grid>}
        </>
    );
}