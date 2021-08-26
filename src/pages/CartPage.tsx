import React, { useEffect, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AccountProduct, AccountProductUpdateDto, buy, deleteAccountProduct, getAccountProduct, getAccountProducts, ResponseEntity, updateAccountProduct } from "../baemin/Baemin"
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { PrivateRouteProps } from "../baemin/BaeminHooks";

interface CartPageProps extends PrivateRouteProps {
}

export default function CartPage(props: CartPageProps) {
    const auth = props.auth;
    const history = useHistory();
    const [products, setProducts] = useState<ResponseEntity<AccountProduct>[]>([]);
    const totalPrice = products
        .map(value => value.data.product.price! * value.data.quantity)
        .reduce((prev, cur) => prev + cur, 0);
    
    useEffect(() => {
        getAccountProducts(auth)
        .then(res => Promise.all(res.data.map(value => getAccountProduct(value.id))))
        .then(res => setProducts(res))
        .catch(reason => alert(reason))
    }, [auth]);

    const columns: GridColDef[] = [
        {
            field: 'seller',
            headerName: 'Seller',
            flex: 1,
            valueGetter: p => p.row.product.seller.name,
        },
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
            valueGetter: p => p.row.product.title,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            valueGetter: p => p.row.product.description,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            flex: 1,
            valueGetter: p => p.row.product.price,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            flex: 1,
            editable: true
        },
        {
            field: 'total',
            headerName: 'Total',
            type: 'number',
            flex: 1,
            valueGetter: p => p.row.product.price * p.row.quantity,
        },
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

    const rows = products.map(value => value.data);

    const handleBuy = () => {
        buy(auth)
        .then(res => history.push("/order", res.data!))
        .catch(reason => alert(reason))
    }

    const handleDelete = (entity: AccountProduct) => {
        deleteAccountProduct(entity)
        .then(() => {
            setProducts(products.filter(value => value.data.id !== entity.id))
        })
        .catch(reason => alert(reason))
    }

    const handleUpdate = (entity: AccountProduct, data: AccountProductUpdateDto) => {
        const found = products.find(value => value.data.id === entity.id);
        if(found) {
            updateAccountProduct(found, data)
            .then(res => {
                setProducts(products.map(value => value.data.id === res.data.id ? res : value))
            })
            .catch(reason => alert(reason))
        }
    }

    return (
        <>
            <Typography variant="h6">Cart</Typography>
            <Box my={2}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    disableColumnMenu
                    disableSelectionOnClick
                    onCellEditCommit={e=>{
                        handleUpdate((e as any).row, {
                            [e.field]: +e.value!
                        })
                    }}
                    />
            </Box>
            <TextField
                label="Total Price"
                variant="outlined"
                fullWidth
                type="number"
                InputProps={{readOnly: true}}
                value={totalPrice}>
            </TextField>
            <Box my={2}>
                <Divider/>
            </Box>
            <Button variant="contained" color="primary" onClick={handleBuy} disabled={products.length === 0}>Buy</Button>
        </>
    );
}