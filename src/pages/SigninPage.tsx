import React, { useState } from "react";
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
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
            alert(reason);
        })
    }

    return (
        <>
            <Typography variant="h6">Sign in</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            <form onSubmit={handleSignin}>
                <Box mb={2}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <TextField autoComplete="username" variant="outlined" autoFocus required name="email" type="email" label="Email" onChange={onChange} fullWidth/>
                        </Grid>
                        <Grid item>
                            <TextField autoComplete="current-password" variant="outlined" required name="password" type="password" label="Password" onChange={onChange} fullWidth/>
                        </Grid>
                    </Grid>
                </Box>
                <Button type="submit" variant="contained" color="primary">Sign in</Button>
            </form>
        </>
    )
}