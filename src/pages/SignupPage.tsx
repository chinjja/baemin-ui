import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { newAccount, NewAccount } from "../baemin/Baemin";
import { useHistory } from "react-router-dom";

export default function SignupPage() {
    const history = useHistory();
    const [data, setData] = useState<NewAccount>();
    const [confirm, setConfirm] = useState("");

    return (
        <div>
            <form autoComplete="off" onSubmit={e=>{
                e.preventDefault();
                if(data) {
                    if(data.password === confirm) {
                        newAccount(data)
                        .then(_ => {
                            history.goBack();
                        })
                        .catch(reason => {
                            alert(reason.message);
                        })
                    }
                    else {
                        alert("not match password");
                    }
                }
                else {
                    alert("invalid data");
                }
            }}>
                <TextField label="Name" onChange={e=>{setData({...data!, name: e.target.value})}} fullWidth/>
                <TextField type="email" label="Email" onChange={e=>setData({...data!, email: e.target.value})} fullWidth/>
                <TextField type="password" label="Password" onChange={e=>setData({...data!, password: e.target.value})} fullWidth/>
                <TextField type="password" label="Confirm" onChange={e=>{setConfirm(e.target.value)}} fullWidth/>
                <Button type="submit" variant="outlined">Submit</Button>
            </form>
        </div>
    )
}