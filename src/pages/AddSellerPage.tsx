import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { getCurrentAccount, newSeller } from '../baemin/Baemin';

export default function AddSellerPage() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    
    return (
        <form autoComplete="off" onSubmit={e=>{
            e.preventDefault();
            const account = getCurrentAccount();
            if(account) {
                newSeller(account, {
                    name: name,
                    description: desc
                })
                .then(seller => {
                    history.push("/seller", {id: seller.id});
                })
                .catch(reason => {
                    if(reason.response.status === 401) {
                        history.push("/login");
                    }
                    else {
                        history.push("/not-found")
                    }
                })
            }
            else {
                history.push("/login");
            }
        }}>
            <TextField label="name" onChange={e=>{setName(e.target.value)}} fullWidth/>
            <TextField label="description" onChange={e=>{setDesc(e.target.value)}} fullWidth/>
            
            <Button type="submit" variant="outlined">Submit</Button>
            <Button variant="outlined" onClick={e=>{history.goBack()}}>Cancel</Button>
        </form>
    )
}