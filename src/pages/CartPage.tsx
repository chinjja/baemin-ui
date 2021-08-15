import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Account, AccountProduct, AccountProductUpdateDto, buy, deleteAccountProduct, getAccountProducts, updateAccountProduct } from "../baemin/Baemin"
import { DataGrid, GridColDef } from "@material-ui/data-grid";

export default function CartPage() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state as Account;
    const [products, setProducts] = useState<AccountProduct[]>([]);
    
    const loadProducts = useCallback(() => {
        getAccountProducts(account)
        .then(res => {
            setProducts(res.data || []);
        })
        .catch(reason => alert(reason))
    }, [account])

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'price', headerName: 'Price', type: 'number', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1, editable: true },
        {
            field: 'delete',
            headerName: ' ',
            sortable: false,
            renderCell: (params) => (
            <Button
                variant="contained"
                color="primary"
                onClick={()=>{handleDelete(params.row as any)}}>
                    Delete
            </Button>
        )
        }
    ]

    const rows = products.map(row => {
        return {
            ...row.product.info,
            ...row,
        }
    })

    const handleBuy = () => {
        buy(account)
        .then(res => history.push("/order", res.data!))
        .catch(reason => alert(reason))
    }

    const handleDelete = (entity: AccountProduct) => {
        deleteAccountProduct(entity)
        .then(res => {
            loadProducts();
        })
        .catch(reason => alert(reason))
    }

    const handleUpdate = (entity: AccountProduct, data: AccountProductUpdateDto) => {
        updateAccountProduct(entity, data)
        .then(res => {
            loadProducts();
        })
        .catch(reason => alert(reason))
    }

    return (
        <>
            <Typography variant="h6">Cart</Typography>
            <Box my={1}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    disableColumnMenu
                    disableSelectionOnClick
                    onCellEditCommit={e=>{
                        handleUpdate((e as any).row, {
                            [e.field]: +e.value!
                        })
                    }}
                    />
            </Box>
            <Button variant="outlined" onClick={handleBuy}>Buy</Button>
        </>
    );
}