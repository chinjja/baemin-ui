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
        .then(orders => setOrders(orders))
        .catch(reason => alert(reason.message))
    })
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'date', headerName: 'Code', flex: 1},
        { field: 'status', headerName: 'Title', flex: 1 },
    ]

    const rows = orders.map(row => {
        return {
            id: row.id,
            date: row.createdAt,
            status: row.status,
            value: row,
        }
    })

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                columns={columns}
                rows={rows}
                pageSize={5}
                onRowClick={e=>history.push("/order", e.row.value)}
                disableSelectionOnClick
                />
        </div>
    );
}