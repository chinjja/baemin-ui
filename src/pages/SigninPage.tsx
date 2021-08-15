import React, { useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
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

    const handleSignin = (e: any) => {
        e.preventDefault();
        
        signin(data)
        .then(_ => {
            history.goBack();
        })
        .catch(reason => {
            alert(reason.message);
        })
    }

    return (
        <>
            <Typography variant="h6">Sign in</Typography>
            <Box my={1}>
                <Divider/>
            </Box>
            <form onSubmit={handleSignin}>
                <Box mb={1}>
                    <TextField name="email" type="email" label="Email" onChange={onChange} fullWidth/>
                    <TextField name="password" type="password" label="Password" onChange={onChange} fullWidth/>
                </Box>
                <Button type="submit" variant="outlined">Sign in</Button>
            </form>
        </>
    )
}