import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";
import {  getCurrentAccount } from "../baemin/Baemin";

export default function MyPage() {
    const history = useHistory();
    const account = getCurrentAccount();
    if(account) {
        const handleCart = (e: any) => {
            history.push("/cart", account);
        }
    
        const handleOrders = (e: any) => {
            history.push("/orders", account);
        }
    
        return (
            <div>
                <Typography>My page</Typography>
                <Typography>{account.name}</Typography>
                <Typography>{account.email}</Typography>
                <Button variant="outlined" onClick={handleCart}>Cart</Button>
                <Button variant="outlined" onClick={handleOrders}>Orders</Button>
            </div>
        );
    }
    else {
        return <Redirect to="/signin"/>
    }
}