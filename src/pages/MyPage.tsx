import React from "react";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";
import { useAccount } from "../baemin/BaeminHooks";

export default function MyPage() {
    const history = useHistory();
    const account = useAccount();
    if(account) {
        const handleCart = (e: any) => {
            history.push("/cart", account);
        }
    
        const handleOrders = (e: any) => {
            history.push("/orders", account);
        }
    
        return (
            <>
                <Typography variant="h6">My page</Typography>
                <Box my={1}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <TextField fullWidth label="Name" variant="outlined" defaultValue={account.name}></TextField>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth label="Email" variant="outlined" defaultValue={account.email}></TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Button variant="outlined" disabled>Modify</Button>
                <Box my={1}>
                    <Divider/>
                </Box>
                <Button variant="outlined" onClick={handleCart}>Cart</Button>
                <Button variant="outlined" onClick={handleOrders}>Orders</Button>
            </>
        );
    }
    else {
        return <Redirect to="/signin"/>
    }
}