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

    const withAccount = (handle: (account: Account)=>void) => {
        const account = getCurrentAccount();
        if(account) {
            handle(account);
        }
        else {
            history.push("/login");
        }
    }

    const handleAddProduct = (e: any) => {
        withAccount(_ => {
            history.push("/product/add", seller);
        });
    }

    const handleAddToCart = (e: any) => {
        withAccount(account => {
            Promise.all(selectionModel.map(product_id=>
                addToCart(account, product_id as number)
            ))
            .then(data => {
                setSelectionModel([]);
                alert("장바구니에 추가되었습니다.")
            })
            .catch(reason => {
                alert(reason);
            })
        });
    };

    const handleGoToCart = (e: any) => {
        withAccount(account => {
            getCart(account)
            .then(cart => {
                history.push("/cart", cart);
            })
            .catch(reason => {
                if(reason.response.status === 404) {
                    alert('장바구니가 존재하지 않습니다.');
                }
                else {
                    alert(reason);
                }
            })
        });
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
            <Button variant="outlined" onClick={handleAddProduct}>Add Product</Button>
            <Button variant="outlined" onClick={handleAddToCart}>Add to cart</Button>
            <Button variant="outlined" onClick={handleGoToCart}>Go to cart</Button>
        </div>
    );
}