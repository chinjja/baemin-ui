import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Image } from "@material-ui/icons";
import { Product } from "../baemin/Baemin";

export interface ProductUiProps {
    product: Product;
}

export default function ProductUi(props: ProductUiProps) {
    const product = props.product;
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <Image />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={product.info.code} />
            <ListItemText primary={product.info.title} secondary={product.info.description} />
            <ListItemText primary={product.info.price}/>
            <ListItemText primary={product.info.description}/>
        </ListItem>
    )
}