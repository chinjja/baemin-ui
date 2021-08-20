import React from "react";
import { Address } from "../baemin/Baemin";
import { Box, Checkbox, Grid, Paper, TextField, Typography } from "@material-ui/core";

interface AddressViewProps {
    address?: Address,
    showMaster?: boolean,
}

export default function AddressView(props: AddressViewProps) {
    const address = props.address;
    const showMaster = props.showMaster;

    if(address) {
        return (
            <>
                <Paper variant="outlined">
                    <Grid container direction="column" spacing={1}>
                        <Box m={2}>
                            {showMaster && <Grid item>
                                <Checkbox checked={address.master} color="primary" readOnly/>
                            </Grid>}
                            <Grid item>
                                <TextField fullWidth label="City" value={address.city} InputProps={{readOnly: true}}></TextField>
                            </Grid>
                            <Grid item>
                                <TextField fullWidth label="Street" value={address.street} InputProps={{readOnly: true}}></TextField>
                            </Grid>
                        </Box>
                    </Grid>
                </Paper>
            </>
        );
    }
    else {
        return (
            <Paper variant="outlined">
                <Box m={2}>
                    <Typography variant="body1">No master Address</Typography>
                </Box>
            </Paper>
        )
    }
}