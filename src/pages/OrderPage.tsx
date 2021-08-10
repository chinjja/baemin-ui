import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { cancel, complete, Order } from "../baemin/Baemin";
import { Button, Typography } from "@material-ui/core";

export default function OrderPage() {
    const location = useLocation();
    const [order, setOrder] = useState(location.state as Order);
    const handleComplete = (e: any) => {
        complete(order)
        .then(order => setOrder(order))
        .catch(reason => alert(reason.message))
    }

    const handleCancel = (e: any) => {
        cancel(order)
        .then(order => setOrder(order))
        .catch(reason => alert(reason.message))
    }

    return (
        <div>
            <Typography>{order.id}</Typography>
            <Typography>{order.status}</Typography>
            <Typography>{order.createdAt}</Typography>
            <Typography>{order.account.email}</Typography>
            <Button variant="outlined" onClick={handleComplete}>Complete</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </div>
    );
}