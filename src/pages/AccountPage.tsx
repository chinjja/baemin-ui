import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { PrivateRouteProps, useMasterAddress } from "../baemin/BaeminHooks";
import AddressView from "../components/AddressView";
import { AccountInfo, entity, getAccount, updateAccount } from "../baemin/Baemin";

interface AccountPageProps extends PrivateRouteProps {
}

export default function AccountPage(props: AccountPageProps) {
    const history = useHistory();
    const auth = props.auth;
    const masterAddress = useMasterAddress(auth);
    const [data, setData] = useState<AccountInfo>({});
    const [account, setAccount] = useState(entity(auth));

    useEffect(() => {
        getAccount(auth.id)
        .then(res => setAccount(res))
        .catch(reason => alert(reason))
    }, [auth]);

    const handleModifyAccount = () => {
        updateAccount(account, data)
        .then(res => setAccount(res))
        .catch(reason => alert(reason))
    }

    const onChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
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
                        <TextField name="name" fullWidth label="Name" variant="outlined" onChange={onChange} defaultValue={account.data.name}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField name="email" fullWidth label="Email" variant="outlined" onChange={onChange} defaultValue={account.data.email}></TextField>
                    </Grid>
                    <Grid item>
                        <AddressView address={masterAddress}/>
                    </Grid>
                </Grid>
            </Box>
            <Button variant="contained" color="primary" onClick={handleModifyAccount}>Modify</Button>
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
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => history.push("/account/addresses")}>Addresses</Button>
                </Grid>
            </Grid>
        </>
    );
}