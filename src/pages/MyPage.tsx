import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";
import {  getCart, getCurrentAccount } from "../baemin/Baemin";

export default function MyPage() {
    const history = useHistory();
    const account = getCurrentAccount();
    if(account) {
        const handleCart = (e: any) => {
            getCart(account)
            .then(cart => history.push("/cart", cart))
            .catch(reason => {
                if(reason.response.status === 404) {
                    alert("장바구니가 없습니다.");
                }
                else {
                    alert(reason.message);
                }
            })
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