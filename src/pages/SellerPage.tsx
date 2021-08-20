import React, { useState } from "react";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { addToCart,  Seller } from "../baemin/Baemin"
import { DataGrid, GridColDef, GridRowId } from "@material-ui/data-grid";
import { useAuth, useProducts } from "../baemin/BaeminHooks";

export default function SellerPage() {
    const history = useHistory();
    const location = useLocation();
    const seller = location.state as Seller;
    const products = useProducts(seller);
    const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
    const auth = useAuth();
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'code', headerName: 'Code', flex: 1},
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'price', headerName: 'Price', type: 'number', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1 },
    ]

    const rows = products.map(row => {
        return {
            ...row,
        }
    })

    const handleAddToCart = () => {
        if(selectionModel.length === 0) {
            alert("선택된 제품이 없습니다.");
            return;
        }
        Promise.all(selectionModel.map(product_id=>
            addToCart(auth!, product_id as number)
        ))
        .then(_ => {
            setSelectionModel([]);
            alert("장바구니에 추가되었습니다.")
        })
        .catch(reason => {
            alert(reason);
        })
    };

    const handleGoToCart = () => {
        history.push("/account/cart", auth!);
    };

    return (
        <>
            <Typography variant="h6">Details of seller</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <TextField fullWidth label="Name" variant="outlined" defaultValue={seller.name} InputProps={{readOnly: true}}></TextField>
                </Grid>
                <Grid item>
                    <TextField fullWidth label="Description" variant="outlined" defaultValue={seller.description} InputProps={{readOnly: true}}></TextField>
                </Grid>
            </Grid>
            <Box my={2}>
                <Divider/>
            </Box>
            <Box my={2}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    checkboxSelection
                    disableColumnMenu
                    disableSelectionOnClick
                    onSelectionModelChange={e=>setSelectionModel(e)}
                    selectionModel={selectionModel}
                    onRowClick={e=>history.push("/product", e.row)}
                    />
            </Box>
            {auth && <Grid container spacing={1}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleAddToCart} disabled={selectionModel.length === 0 || undefined}>Add to cart</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleGoToCart}>Go to cart</Button>
                </Grid>
            </Grid>}
        </>
    );
}