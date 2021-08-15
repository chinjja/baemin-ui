import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Image } from "@material-ui/icons";
import { Seller } from "../baemin/Baemin";

export interface SellerUiProps {
    seller: Seller;
}

export default function SellerUi(props: SellerUiProps) {
    const seller = props.seller;
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <Image />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={seller.info.name} secondary={seller.info.description} />
        </ListItem>
    )
}