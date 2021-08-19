import React from "react";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { PrivateRouteProps } from "../baemin/BaeminHooks";

interface AccountPageProps extends PrivateRouteProps {
}

export default function AccountPage(props: AccountPageProps) {
    const history = useHistory();
    const auth = props.auth;

    const handleModifyAccount = () => {
        
    }

    return (
        <>
            <Typography variant="h6">My page</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            <Box my={2}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <TextField fullWidth label="Name" variant="outlined" defaultValue={auth.name}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Email" variant="outlined" defaultValue={auth.email}></TextField>
                    </Grid>
                </Grid>
            </Box>
            <Button variant="contained" color="primary" onClick={handleModifyAccount} disabled>Modify</Button>
            <Box my={2}>
                <Divider/>
            </Box>
            <Grid container spacing={1}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => history.push("/account/cart")}>Cart</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => history.push("/account/orders")}>Orders</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => history.push("/account/sellers")}>Sellers</Button>
                </Grid>
            </Grid>
        </>
    );
}