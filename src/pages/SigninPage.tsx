import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { SignIn, signin } from "../baemin/Baemin";
import { useHistory } from "react-router-dom";

export default function SigninPage() {
    const history = useHistory();
    const [data, setData] = useState<SignIn>({});

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
                 signin(data)
                .then(_ => {
                    history.goBack();
                })
                .catch(reason => {
                    alert(reason.message);
                })
            }}>
                <TextField name="email" type="email" label="Email" onChange={onChange} fullWidth/>
                <TextField name="password" type="password" label="Password" onChange={onChange} fullWidth/>
                <Button type="submit" variant="outlined">Submit</Button>
            </form>
        </div>
    )
}