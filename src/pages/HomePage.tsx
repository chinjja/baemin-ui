import React, { useEffect, useState } from "react";
import { Button, List, Typography } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import { getSellers, Seller } from "../baemin/Baemin"
import SellerUi from "../components/SellerUi";

export default function HomePage() {
    const history = useHistory();
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        getSellers()
        .then(sellers => {
            setSellers(sellers);
        })
        .catch(reason => {
            setError(true);
        })
    }, []);

    if(error) {
        return (
            <Redirect to='/error'/>
        )
    }
    const sellerList = sellers.map((seller, index) => <SellerUi seller={seller} key={index}/>);
    return (
        <div>
            <Typography>Seller Page</Typography>
            <List>
                {sellerList}
            </List>
            <Button variant="outlined" onClick={e=>{history.push("/seller/add")}}>Add Seller</Button>
        </div>
    );
}