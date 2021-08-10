import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { newProduct, ProductInfo, Seller } from '../baemin/Baemin';

export default function AddProductPage() {
    const history = useHistory();
    const location = useLocation();
    const seller = location.state as Seller;
    const [data, setData] = useState<ProductInfo>();
    
    return (
        <form autoComplete="off" onSubmit={e=>{
            e.preventDefault();
            newProduct(seller, data!)
            .then(_ => {
                history.goBack();
            })
            .catch(reason => {
                alert(reason.message);
            })
        }}>
            <TextField label="code" onChange={e=>{setData({...data!, code: e.target.value})}} fullWidth/>
            <TextField label="title" onChange={e=>{setData({...data!, title: e.target.value})}} fullWidth/>
            <TextField label="description" onChange={e=>{setData({...data!, description: e.target.value})}} fullWidth/>
            <TextField type="number" label="price" onChange={e=>{setData({...data!, price: +e.target.value})}} fullWidth/>
            <TextField type="number" label="quantity" onChange={e=>{setData({...data!, quantity: +e.target.value})}} fullWidth/>
            
            <Button type="submit" variant="outlined">Submit</Button>
            <Button variant="outlined" onClick={e=>{history.goBack()}}>Cancel</Button>
        </form>
    )
}