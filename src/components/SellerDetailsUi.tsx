import React, { useEffect, useState } from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Image } from "@material-ui/icons";
import { getProducts, Product, Seller } from "../baemin/Baemin";
import SellerUi from "./SellerUi";

export interface SellerDetailsUiProps {
    seller: Seller;
}

export default function SellerDetailsUi(props: SellerDetailsUiProps) {
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        getProducts(props.seller)
        .then(res => setProducts(res.data || []))
    });

    const productList = products?.map((product, index) =>
        <ListItem key={index}>
            <ListItemAvatar>
                <Avatar>
                    <Image />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={product.info.title} secondary={product.info.description} />
            <ListItemText secondary={product.info.price}/>
            <ListItemText secondary={product.info.quantity}/>
        </ListItem>
    );
    return (
        <div>
            <SellerUi seller={props.seller}/>
            <List>
                {productList}
            </List>
        </div>
        
    );
}