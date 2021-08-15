import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cancel, complete, getOrderProducts, Order, OrderProduct } from "../baemin/Baemin";
import { Box, Button, Divider, Typography } from "@material-ui/core";
import { DataGrid, GridColDef } from "@material-ui/data-grid";

export default function OrderPage() {
    const location = useLocation();
    const [order, setOrder] = useState(location.state as Order);
    const [products, setProducts] = useState<OrderProduct[]>([]);

    useEffect(() => {
        getOrderProducts(order)
        .then(res => setProducts(res.data || []))
        .catch(reason => alert(reason))
    }, [order])

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
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'price', headerName: 'Price', type: 'number', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1 },
    ]

    const rows = products.map(row => {
        return {
            ...row.product.info,
            ...row,
        }
    })

    return (
        <>
            <Typography variant="h6">Order</Typography>
            <Box my={1}>
                <Divider/>
            </Box>
            <Typography variant="body2">{order.id}</Typography>
            <Typography variant="body2">{order.status}</Typography>
            <Typography variant="body2">{order.createdAt}</Typography>
            <Typography variant="body2">{order.account.email}</Typography>
            <Box my={1}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    disableSelectionOnClick
                    disableColumnMenu
                    />
            </Box>
            <Button variant="outlined" onClick={handleComplete}>Complete</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </>
    );
}