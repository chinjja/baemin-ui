import React, { useState } from 'react'
import { Box, Button, Divider, Grid, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { AddressInfo, newAddress } from '../baemin/Baemin';
import { PrivateRouteProps } from '../baemin/BaeminHooks';

interface AddAddressPageProps extends PrivateRouteProps {

}
export default function AddAddressPage(props: AddAddressPageProps) {
    const auth = props.auth;
    const history = useHistory();
    const [data, setData] = useState<AddressInfo>({});

    const onChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        newAddress(auth, data)
        .then(res => {
            history.replace("/address", res.data);
        })
        .catch(reason => {
            alert(reason);
        })
    };

    return (
        <>
            <Typography variant="h6">New Address</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            <form onSubmit={handleSubmit}>
                <Box my={2}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <TextField autoFocus required variant="outlined" name="city" label="City" onChange={onChange} fullWidth/>
                        </Grid>
                        <Grid item>
                            <TextField required variant="outlined" name="street" label="Street" onChange={onChange} fullWidth/>
                        </Grid>
                    </Grid>
                </Box>
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </>
    )
}