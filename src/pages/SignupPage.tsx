import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { newAccount, NewAccount } from "../baemin/Baemin";
import { useHistory } from "react-router-dom";

interface Signup extends NewAccount {
    confirm?: string;
}

export default function SignupPage() {
    const history = useHistory();
    const [data, setData] = useState<Signup>({});

    const onChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div>
            <form autoComplete="off" onSubmit={e=>{
                e.preventDefault();

                if(data && (data.password === data.confirm)) {
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
            }}>
                <TextField name="name" label="Name" onChange={onChange} fullWidth/>
                <TextField name="email" type="email" label="Email" onChange={onChange} fullWidth/>
                <TextField name="password" type="password" label="Password" onChange={onChange} fullWidth/>
                <TextField name="confirm" type="password" label="Confirm" onChange={onChange} fullWidth/>
                <Button type="submit" variant="outlined">Submit</Button>
            </form>
        </div>
    )
}