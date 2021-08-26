import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useSellers } from "../baemin/BaeminHooks";

export default function HomePage() {
    const history = useHistory();
    const sellers = useSellers();
    
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1},
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'seller', headerName: 'Seller', flex: 1, valueGetter: p => p.row.account.name },
    ]

    return (
        <>
            <Typography variant="h6">List of seller</Typography>
            <Box my={2}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={sellers}
                    onRowClick={e=>history.push("/seller", e.row)}
                    disableSelectionOnClick
                    disableColumnMenu
                    />
            </Box>
        </>
    );
}