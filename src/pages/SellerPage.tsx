import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Account, addToCart, getCurrentAccount, getProducts, Product, Seller } from "../baemin/Baemin"
import SellerUi from "../components/SellerUi";
import { DataGrid, GridColDef, GridRowId } from "@material-ui/data-grid";

export default function SellerPage() {
    const history = useHistory();
    const location = useLocation();
    const seller = location.state as Seller;
    const [products, setProducts] = useState<Product[]>([]);
    const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
    const account = getCurrentAccount();
    
    useEffect(() => {
        getProducts(seller)
        .then(res => setProducts(res.data || []))
    }, [seller]);
    
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
            ...row.info,
            ...row,
        }
    })

    const handleAddProduct = () => {
        history.push("/product/add", seller);
    }

    const handleAddToCart = () => {
        if(selectionModel.length === 0) {
            alert("선택된 제품이 없습니다.");
            return;
        }
        Promise.all(selectionModel.map(product_id=>
            addToCart(account!, product_id as number)
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
        history.push("/cart", account!);
    };

    return (
        <>
            <SellerUi seller={seller}/>
            <Box my={1}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    checkboxSelection
                    disableColumnMenu
                    disableSelectionOnClick
                    onSelectionModelChange={e=>setSelectionModel(e)}
                    selectionModel={selectionModel}
                    />
            </Box>
            {seller.account.id === account?.id && <Button variant="outlined" onClick={handleAddProduct}>Add Product</Button>}
            {account && <Button variant="outlined" onClick={handleAddToCart} disabled={selectionModel.length === 0 || undefined}>Add to cart</Button>}
            {account && <Button variant="outlined" onClick={handleGoToCart}>Go to cart</Button>}
        </>
    );
}