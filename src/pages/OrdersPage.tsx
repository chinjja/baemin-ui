import React from "react";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useHistory, useLocation } from "react-router-dom";
import { Account } from "../baemin/Baemin";
import { Box, Typography } from "@material-ui/core";
import { useOrders } from "../baemin/BaeminHooks";

export default function OrdersPage() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state as Account;
    const orders = useOrders(account);
    
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
        <>
            <Typography variant="h6">List of order</Typography>
            <Box my={1}>
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
            </Box>
        </>
    );
}