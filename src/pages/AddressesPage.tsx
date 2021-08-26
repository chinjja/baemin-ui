import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { PrivateRouteProps, useAddresses } from '../baemin/BaeminHooks';
import { DataGrid, GridColDef } from '@material-ui/data-grid';

interface AddressesPageProps extends PrivateRouteProps {

}

export default function AddressesPage(props: AddressesPageProps) {
    const auth = props.auth;
    const history = useHistory();
    const addresses = useAddresses(auth);

    const columns: GridColDef[] = [
        { field: 'master', type: 'boolean', headerName: 'Master' },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'city', headerName: 'City', flex: 1 },
        { field: 'street', headerName: 'Street', flex: 1 },
    ]

    return (
        <>
            <Typography variant="h6">List of Address</Typography>
            <Box my={2}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={addresses}
                    disableColumnMenu
                    disableSelectionOnClick
                    onRowClick={e=>history.push("/account/address", e.row)}
                    />
            </Box>
            <Button variant="contained" color="primary" onClick={()=>history.push("/account/address/add")}>Add Address</Button>
        </>
    );
}