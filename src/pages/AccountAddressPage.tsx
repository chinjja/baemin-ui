import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Address, AddressInfo, entity, getAddress, updateAddress } from "../baemin/Baemin";
import { Box, Button, Checkbox, Divider, Grid, TextField, Typography } from "@material-ui/core";
import { PrivateRouteProps } from "../baemin/BaeminHooks";

interface AccountAddressPageProps extends PrivateRouteProps {

}

export default function AccountAddressPage(props: AccountAddressPageProps) {
    const auth = props.auth;
    const location = useLocation();
    const origin = location.state as Address;
    const [address, setAddress] = useState(entity(origin));
    const [dto, setDto] = useState<AddressInfo>({});

    useEffect(() => {
        getAddress(origin.id)
        .then(res => setAddress(res))
        .catch(reason => alert(reason))
    }, [origin])

    const handleModify = () => {
        if(address) {
            updateAddress(address, dto)
            .then(res => setAddress(res))
            .catch(reason => alert(reason))
        }
    }

    const onChange = (e: any) => {
        setDto({
            ...dto,
            [e.target.name]: e.target.value
        })
    }

    if(address.data.account.id !== auth.id) {
        return <Redirect to="/invalid"/>
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
                        <Checkbox name="master" defaultChecked={address.data.master} color="primary" onChange={e=>setDto({
                            ...dto,
                            master: e.target.checked,
                        })}/>
                    </Grid>
                    <Grid item>
                        <TextField name="name" fullWidth label="Name" variant="outlined" defaultValue={address.data.name} onChange={onChange}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField name="city" fullWidth label="City" variant="outlined" defaultValue={address.data.city} onChange={onChange}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField name="street" fullWidth label="Street" variant="outlined" defaultValue={address.data.street} onChange={onChange}></TextField>
                    </Grid>
                </Grid>
            </Box>
            <Button type="submit" variant="contained" color="primary" onClick={handleModify}>Modify</Button>
        </>
    );
}