import React, { useEffect, useState } from "react";
import { List, Typography } from "@material-ui/core";
import { Redirect, useLocation } from "react-router-dom";
import { getProducts, getSeller, Product, Seller } from "../baemin/Baemin"
import SellerUi from "../components/SellerUi";
import ProductUi from "../components/ProductUi";

export default function SellerDetailsPage() {
    const location = useLocation();
    const state = location.state as any;
    const [seller, setSeller] = useState<Seller>();
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        getSeller(state.id)
        .then(data => {
            setSeller(data);
            return data;
        })
        .then(data => getProducts(data))
        .then(data => setProducts(data))
        .catch(reason => {
            setError(true);
        })
    }, [state]);

    if(error) {
        return (
            <Redirect to='/error'/>
        )
    }
    const productList = products.map((product, index) => <ProductUi product={product} key={index}/>);
    return (
        <div>
            <Typography>Seller Details Page</Typography>
            <SellerUi seller={seller}/>
            <Typography>Product List</Typography>
            <List>
                {productList}
            </List>
        </div>
    );
}