import React, { useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
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

    const handleSignup = (e: any) => {
        e.preventDefault();
        
        if(data && (data.password === data.confirm)) {
            newAccount(data)
            .then(_ => {
                history.goBack();
            })
            .catch(reason => {
                alert(reason);
            })
        }
        else {
            alert("not match password");
        }
    }

    return (
        <>
            <Typography variant="h6">Sign up</Typography>
            <Box my={1}>
                <Divider/>
            </Box>
            <form onSubmit={handleSignup}>
                <Box mb={1}>
                    <TextField autoFocus required name="name" label="Name" onChange={onChange} fullWidth/>
                    <TextField required name="email" type="email" label="Email" onChange={onChange} fullWidth/>
                    <TextField required name="password" type="password" label="Password" onChange={onChange} fullWidth/>
                    <TextField required name="confirm" type="password" label="Confirm" onChange={onChange} fullWidth/>
                </Box>
                <Button type="submit" variant="outlined">Sign up</Button>
            </form>
        </>
    )
}