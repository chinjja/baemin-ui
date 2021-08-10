import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { Account, newSeller } from '../baemin/Baemin';

export default function AddSellerPage() {
    const history = useHistory();
    const location = useLocation();
    
    const account = location.state as Account | undefined;
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    
    if(account === undefined) {
        return <Redirect to="/login"/>
    }

    return (
        <form autoComplete="off" onSubmit={e=>{
            e.preventDefault();
            
            newSeller(account, {
                name: name,
                description: desc
            })
            .then(seller => {
                history.replace("/seller", seller);
            })
            .catch(reason => {
                if(reason.response.status === 401) {
                    history.push("/login");
                }
                else {
                    history.push("/not-found")
                }
            })
        }}>
            <TextField label="name" onChange={e=>{setName(e.target.value)}} fullWidth/>
            <TextField label="description" onChange={e=>{setDesc(e.target.value)}} fullWidth/>
            
            <Button type="submit" variant="outlined">Submit</Button>
            <Button variant="outlined" onClick={e=>{history.goBack()}}>Cancel</Button>
        </form>
    )
}