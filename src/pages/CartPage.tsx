import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AccountProduct, AccountProductUpdateDto, buy, deleteAccountProduct, getAccountProducts, updateAccountProduct } from "../baemin/Baemin"
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { PrivateRouteProps } from "../baemin/BaeminHooks";

interface CartPageProps extends PrivateRouteProps {
}

export default function CartPage(props: CartPageProps) {
    const history = useHistory();
    const account = props.account;
    const [products, setProducts] = useState<AccountProduct[]>([]);
    
    useEffect(() => {
        getAccountProducts(account)
        .then(res => setProducts(res.data || []))
        .catch(reason => alert(reason))
    }, [account]);

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
        .then(() => {
            setProducts(products.filter(value => value.id !== entity.id))
        })
        .catch(reason => alert(reason))
    }

    const handleUpdate = (entity: AccountProduct, data: AccountProductUpdateDto) => {
        updateAccountProduct(entity, data)
        .then(res => {
            setProducts(products.map(value => value.id === res.data?.id ? res.data : value))
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