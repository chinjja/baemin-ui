import React, { useState } from 'react'
import { Box, Button, Divider, Grid, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { newSeller, SellerInfo } from '../baemin/Baemin';
import { PrivateRouteProps } from '../baemin/BaeminHooks';

interface AddSellerPageProps extends PrivateRouteProps {

}
export default function AddSellerPage(props: AddSellerPageProps) {
    const auth = props.auth;
    const history = useHistory();
    const [data, setData] = useState<SellerInfo>({});

    const onChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        newSeller(auth, data)
        .then(res => {
            history.replace("/account/seller", res.data);
        })
        .catch(reason => {
            alert(reason);
        })
    };

    return (
        <>
            <Typography variant="h6">New Seller</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            <form onSubmit={handleSubmit}>
                <Box my={2}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <TextField autoFocus required variant="outlined" name="name" label="Name" onChange={onChange} fullWidth/>
                        </Grid>
                        <Grid item>
                            <TextField required variant="outlined" name="description" label="Description" onChange={onChange} fullWidth/>
                        </Grid>
                    </Grid>
                </Box>
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </>
    )
}