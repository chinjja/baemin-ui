import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getCurrentAccount, getSellers, Seller } from "../baemin/Baemin"
import { DataGrid, GridColDef } from "@material-ui/data-grid";

export default function HomePage() {
    const history = useHistory();
    const [sellers, setSellers] = useState<Seller[]>([]);
    const account = getCurrentAccount();

    useEffect(() => {
        getSellers()
        .then(res => {
            setSellers(res.data || []);
        })
        .catch(reason => {
            alert(reason);
        })
    }, []);

    const handleAddSeller = () => {
        history.push("/seller/add", account!);
    }
    
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1},
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'seller', headerName: 'Seller', flex: 1 },
    ]

    const rows = sellers.map(row => {
        return {
            ...row.info,
            ...row,
            seller: row.account.name,
        }
    })

    return (
        <>
            <Typography variant="h6">List of seller</Typography>
            <Box my={1}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    onRowClick={e=>history.push("/seller", e.row)}
                    disableSelectionOnClick
                    disableColumnMenu
                    />
            </Box>
            {account && <Button variant="outlined" onClick={handleAddSeller}>Add Seller</Button>}
        </>
    );
}