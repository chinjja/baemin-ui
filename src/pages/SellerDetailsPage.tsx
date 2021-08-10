import React, { useEffect, useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { getProducts, Product, Seller } from "../baemin/Baemin"
import SellerUi from "../components/SellerUi";
import { DataGrid, GridColDef } from "@material-ui/data-grid";

export default function SellerDetailsPage() {
    const history = useHistory();
    const location = useLocation();
    const seller = location.state as Seller;
    const [products, setProducts] = useState<Product[]>([]);

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
                    />
            </div>
            <Button variant="outlined" onClick={e=>{history.push("/product/add", seller)}}>Add Product</Button>
        </div>
    );
}