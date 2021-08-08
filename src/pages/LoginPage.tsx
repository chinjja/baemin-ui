import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { signin } from "../baemin/Baemin";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <form autoComplete="off" onSubmit={e=>{
                e.preventDefault();
                 signin({
                    email: email,
                    password: password
                })
                .then(account => {
                    history.goBack();
                })
                .catch(reason => {
                    console.log(reason);
                    history.push("/not-found");
                })
            }}>
                <TextField type="email" label="email" onChange={e=>{setEmail(e.target.value)}} fullWidth/>
                <TextField type="password" label="password" onChange={e=>{setPassword(e.target.value)}} fullWidth/>
                <Button type="submit" variant="outlined">Submit</Button>
            </form>
        </div>
    )
}