import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Account, addToCart, getCart, getCurrentAccount, getProducts, Product, Seller } from "../baemin/Baemin"
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
        .then(data => setProducts(data))
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
            id: row.id,
            code: row.info.code,
            title: row.info.title,
            description: row.info.description,
            price: row.info.price,
            quantity: row.info.quantity,
        }
    })

    const handleAddProduct = () => {
        history.push("/product/add", seller);
    }

    const handleAddToCart = () => {
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
        getCart(account!)
        .then(cart => {
            if(cart) {
                history.push("/cart", cart);
            }
            else {
                alert('장바구니가 존재하지 않습니다.');
            }
        })
        .catch(reason => {
            alert(reason.message);
        })
    };

    return (
        <div>
            <Typography>Seller Details Page</Typography>
            <SellerUi seller={seller}/>
            <Typography>Product List</Typography>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={e=>setSelectionModel(e)}
                    selectionModel={selectionModel}
                    />
            </div>
            {seller.account.id === account?.id && <Button variant="outlined" onClick={handleAddProduct}>Add Product</Button>}
            {account && <Button variant="outlined" onClick={handleAddToCart}>Add to cart</Button>}
            {account && <Button variant="outlined" onClick={handleGoToCart}>Go to cart</Button>}
        </div>
    );
}