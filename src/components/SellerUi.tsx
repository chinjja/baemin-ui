import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Image } from "@material-ui/icons";
import { Seller } from "../baemin/Baemin";
import { useHistory } from "react-router-dom";

export interface SellerUiProps {
    seller: Seller | undefined;
}

export default function SellerUi(props: SellerUiProps) {
    const history = useHistory();
    const seller = props.seller;
    if(seller === undefined) {
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Image />
                    </Avatar>
                </ListItemAvatar>
            </ListItem>
        )
    }
    return (
        <ListItem onClick={e => {history.push("/seller", {id: seller.id})}}>
            <ListItemAvatar>
                <Avatar>
                    <Image />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={seller.info.name} secondary={seller.info.description} />
        </ListItem>
    )
}