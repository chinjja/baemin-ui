import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { Account, newSeller, SellerInfo } from '../baemin/Baemin';

export default function AddSellerPage() {
    const history = useHistory();
    const location = useLocation();
    
    const account = location.state as Account;
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
            alert(reason.message);
        })
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField name="name" label="Name" onChange={onChange} fullWidth/>
            <TextField name="description" label="Description" onChange={onChange} fullWidth/>
            
            <Button type="submit" variant="outlined">Submit</Button>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </form>
    )
}