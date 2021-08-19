import React, { useState } from 'react'
import { Box, Button, Divider, TextField, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { newSeller, SellerInfo } from '../baemin/Baemin';
import { PrivateRouteProps } from '../baemin/BaeminHooks';

interface AddSellerPageProps extends PrivateRouteProps {

}
export default function AddSellerPage(props: AddSellerPageProps) {
    const history = useHistory();
    const account = props.account;
    const [data, setData] = useState<SellerInfo>({});

    const onChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        newSeller(account, data)
        .then(res => {
            history.replace("/seller", res.data);
        })
        .catch(reason => {
            alert(reason);
        })
    };

    return (
        <>
            <Typography variant="h6">New Seller</Typography>
            <Box my={1}>
                <Divider/>
            </Box>
            <form onSubmit={handleSubmit}>
                <Box mb={1}>
                    <TextField autoFocus required name="name" label="Name" onChange={onChange} fullWidth/>
                    <TextField required name="description" label="Description" onChange={onChange} fullWidth/>
                </Box>
                <Button type="submit" variant="outlined">Create</Button>
            </form>
        </>
    )
}