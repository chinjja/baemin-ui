import React, { useEffect, useState } from "react";
import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { getProducts, Product, Seller } from "../baemin/Baemin"
import SellerUi from "../components/SellerUi";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function SellerDetailsPage() {
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();
    const seller = location.state as Seller;
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts(seller)
        .then(data => setProducts(data))
    }, [seller]);
    
    return (
        <div>
            <Typography>Seller Details Page</Typography>
            <SellerUi seller={seller}/>
            <Typography>Product List</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>{row.info.code}</TableCell>
                                <TableCell>{row.info.title}</TableCell>
                                <TableCell>{row.info.description}</TableCell>
                                <TableCell>{row.info.price}</TableCell>
                                <TableCell>{row.info.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Button variant="outlined" onClick={e=>{history.push("/product/add", seller)}}>Add Product</Button>
        </div>
    );
}