import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { PrivateRouteProps, useSellers } from "../baemin/BaeminHooks";

interface AccountSellersPageProps extends PrivateRouteProps {
    
}

export default function AccountSellersPage(props: AccountSellersPageProps) {
    const auth = props.auth;
    const history = useHistory();
    const sellers = useSellers(auth);

    const handleAddSeller = () => {
        history.push("/account/seller/add");
    }
    
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1},
        { field: 'description', headerName: 'Description', flex: 1 },
    ]

    const rows = sellers.map(row => {
        return {
            ...row.info,
            ...row,
        }
    })

    return (
        <>
            <Typography variant="h6">List of seller</Typography>
            <Box my={2}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    onRowClick={e=>history.push("/account/seller", e.row)}
                    disableSelectionOnClick
                    disableColumnMenu
                    />
            </Box>
            <Button variant="contained" color="primary" onClick={handleAddSeller}>Add Seller</Button>
        </>
    );
}