import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { cancel, complete, entity, getOrder, Order } from "../baemin/Baemin";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useAuth, useOrderProducts } from "../baemin/BaeminHooks";

export default function OrderPage() {
    const auth = useAuth();
    const history = useHistory();
    const location = useLocation();
    const origin = location.state as Order;
    const [order, setOrder] = useState(entity(origin));
    const products = useOrderProducts(order.data);

    useEffect(() => {
        getOrder(origin.id)
        .then(res => setOrder(res))
        .catch(reason => alert(reason))
    }, [origin])

    const handleComplete = () => {
        complete(order)
        .then(res => setOrder(res))
        .catch(reason => alert(reason))
    }

    const handleCancel = () => {
        cancel(order)
        .then(res => setOrder(res))
        .catch(reason => alert(reason))
    }

    const columns: GridColDef[] = [
        {
            field: 'seller',
            headerName: 'Seller',
            flex: 1,
            valueGetter: p => p.row.product.seller.name
        },
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
            valueGetter: p => p.row.product.title
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            flex: 1,
            valueGetter: p => p.row.product.price },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            flex: 1
        },
    ]

    const isOwner = order.data.account.id === auth?.id;

    return (
        <>
            <Typography variant="h6">Details of Order</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            
            <Box my={2}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <TextField fullWidth label="ID" variant="outlined" defaultValue={order.data.id} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Status" variant="outlined" defaultValue={order.data.status} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Date" variant="outlined" defaultValue={order.data.createdAt.toLocaleString()} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Buyer" variant="outlined" defaultValue={order.data.account.name} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                </Grid>
            </Box>
            <Divider/>
            <Box my={2}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={products}
                    disableSelectionOnClick
                    disableColumnMenu
                    onRowClick={e=>history.push("/product", e.row.product)}
                    />
            </Box>
            {isOwner && <Grid container spacing={1}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleComplete} disabled={order.data.status !== "IN_PROGRESS" || undefined}>Complete</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleCancel} disabled={order.data.status !== "IN_PROGRESS" || undefined}>Cancel</Button>
                </Grid>
            </Grid>}
        </>
    );
}