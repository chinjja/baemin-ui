import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useHistory, useLocation } from "react-router-dom";
import { Account, getOrders, Order } from "../baemin/Baemin";

export default function OrdersPage() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state as Account;
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        getOrders(account)
        .then(res => setOrders(res.data || []))
        .catch(reason => alert(reason.message))
    }, [account])
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'createdAt', headerName: 'Date', flex: 1},
        { field: 'status', headerName: 'Status', flex: 1 },
    ]

    const rows = orders.map(row => {
        return {
            ...row,
        }
    })

    return (
        <DataGrid
            autoHeight
            columns={columns}
            rows={rows}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            onRowClick={e=>history.push("/order", e.row)}
            disableSelectionOnClick
            disableColumnMenu
            />
    );
}