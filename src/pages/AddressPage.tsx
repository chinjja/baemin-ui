import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Address } from "../baemin/Baemin";
import { Box, Checkbox, Divider, Grid, TextField, Typography } from "@material-ui/core";

export default function AddressPage() {
    const location = useLocation();
    const address = location.state as Address;

    return (
        <>
            <Typography variant="h6">Details of Address</Typography>
            <Box my={2}>
                <Divider/>
            </Box>
            
            <Box my={2}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Checkbox defaultChecked={address.master} color="primary" readOnly/>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Name" variant="outlined" defaultValue={address.name} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="City" variant="outlined" defaultValue={address.city} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Street" variant="outlined" defaultValue={address.street} InputProps={{readOnly: true}}></TextField>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}