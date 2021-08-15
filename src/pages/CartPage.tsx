import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Account, AccountProduct, buy, getAccountProducts } from "../baemin/Baemin"
import { DataGrid, GridColDef } from "@material-ui/data-grid";

export default function CartPage() {
    const history = useHistory();
    const location = useLocation();
    const account = location.state as Account;
    const [products, setProducts] = useState<AccountProduct[]>([]);

    useEffect(() => {
        getAccountProducts(account)
        .then(res => {
            setProducts(res.data || []);
        })
        .catch(reason => alert(reason.message))
    }, [account]);
    
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
        buy(account)
        .then(res => history.push("/order", res.data!))
        .catch(reason => alert(reason.message))
    }

    return (
        <div>
            <Typography>Cart product List</Typography>
            <DataGrid
                autoHeight
                columns={columns}
                rows={rows}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                disableColumnMenu
                />
            <Button variant="outlined" onClick={handleBuy}>Buy</Button>
        </div>
    );
}