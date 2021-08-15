import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";
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
            alert(reason.message);
        })
    }, []);

    const handleAddSeller = () => {
        history.push("/seller/add", account!);
    }
    
    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', flex: 1},
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'seller', headerName: 'Seller', flex: 1 },
    ]

    const rows = sellers.map(row => {
        return {
            id: row.id,
            title: row.info.name,
            description: row.info.description,
            seller: row.account.name,
            value: row,
        }
    })

    return (
        <div>
            <Typography>Seller Page</Typography>
            <DataGrid
                autoHeight
                columns={columns}
                rows={rows}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                onRowClick={e=>history.push("/seller", e.row.value)}
                disableSelectionOnClick
                disableColumnMenu
                />

            {account && <Button variant="outlined" onClick={handleAddSeller}>Add Seller</Button>}
        </div>
    );
}