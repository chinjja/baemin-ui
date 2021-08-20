import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Address, updateAddress } from "../baemin/Baemin";
import { Box, Button, Checkbox, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { PrivateRouteProps } from "../baemin/BaeminHooks";

interface AccountAddressPageProps extends PrivateRouteProps {

}

export default function AccountAddressPage(props: AccountAddressPageProps) {
    const auth = props.auth;
    const location = useLocation();
    const [address, setAddress] = useState(location.state as Address);

    if(address.account.id !== auth.id) {
        return <Redirect to="/invalid"/>
    }

    const handleModify = () => {
        updateAddress(address, address)
        .then(res => setAddress(res.data!))
        .catch(reason => alert(reason))
    }

    const onChange = (e: any) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Typography variant="h6">Details of Address</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            
            <Box my={2}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Checkbox name="master" checked={address.master} color="primary" onChange={e=>setAddress({
                            ...address,
                            master: e.target.checked,
                        })}/>
                    </Grid>
                    <Grid item>
                        <TextField name="name" fullWidth label="Name" variant="outlined" value={address.name} onChange={onChange}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField name="city" fullWidth label="City" variant="outlined" value={address.city} onChange={onChange}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField name="street" fullWidth label="Street" variant="outlined" value={address.street} onChange={onChange}></TextField>
                    </Grid>
                </Grid>
            </Box>
            <Button type="submit" variant="contained" color="primary" onClick={handleModify}>Modify</Button>
        </>
    );
}