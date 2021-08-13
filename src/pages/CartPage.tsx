import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { buy, Cart, CartProduct, getCartProducts } from "../baemin/Baemin"
import { DataGrid, GridColDef } from "@material-ui/data-grid";

export default function CartPage() {
    const history = useHistory();
    const location = useLocation();
    const cart = location.state as Cart;
    const [products, setProducts] = useState<CartProduct[]>([]);

    useEffect(() => {
        getCartProducts(cart)
        .then(data => setProducts(data))
        .catch(reason => alert(reason.message))
    }, [cart]);
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'price', headerName: 'Price', type: 'number', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 1 },
    ]

    const rows = products.map(row => {
        return {
            id: row.id,
            title: row.product.info.title,
            description: row.product.info.description,
            price: row.product.info.price,
            quantity: row.quantity,
        }
    })

    const handleBuy = () => {
        buy(cart)
        .then(order => history.push("/order", order))
        .catch(reason => alert(reason.message))
    }

    return (
        <div>
            <Typography>Cart product List</Typography>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    />
            </div>
            <Button variant="outlined" onClick={handleBuy}>Buy</Button>
        </div>
    );
}