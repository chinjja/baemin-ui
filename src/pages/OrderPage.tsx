import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cancel, complete, getOrderProducts, Order, OrderProduct } from "../baemin/Baemin";
import { Button, Typography } from "@material-ui/core";
import { DataGrid, GridColDef } from "@material-ui/data-grid";

export default function OrderPage() {
    const location = useLocation();
    const [order, setOrder] = useState(location.state as Order);
    const [products, setProducts] = useState<OrderProduct[]>([]);

    useEffect(() => {
        getOrderProducts(order)
        .then(res => setProducts(res.data || []))
        .catch(reason => alert(reason.message))
    }, [order])

    const handleComplete = () => {
        complete(order)
        .then(res => setOrder(res.data!))
        .catch(reason => alert(reason.message))
    }

    const handleCancel = () => {
        cancel(order)
        .then(res => setOrder(res.data!))
        .catch(reason => alert(reason.message))
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
        <div>
            <Typography>{order.id}</Typography>
            <Typography>{order.status}</Typography>
            <Typography>{order.createdAt}</Typography>
            <Typography>{order.account.email}</Typography>
            <DataGrid
                autoHeight
                columns={columns}
                rows={rows}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                disableSelectionOnClick
                disableColumnMenu
                />
            <Button variant="outlined" onClick={handleComplete}>Complete</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </div>
    );
}