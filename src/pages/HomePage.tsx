import React, { useEffect, useState } from "react";
import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getCurrentAccount, getSellers, Seller } from "../baemin/Baemin"

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function HomePage() {
    const classes = useStyles();

    const history = useHistory();
    const [sellers, setSellers] = useState<Seller[]>([]);

    useEffect(() => {
        getSellers()
        .then(sellers => {
            setSellers(sellers);
        })
    }, []);
    
    return (
        <div>
            <Typography>Seller Page</Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sellers.map(row => (
                            <TableRow key={row.id} onClick={e=>{history.push("/seller", row)}}>
                                <TableCell>{row.info.name}</TableCell>
                                <TableCell>{row.info.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant="outlined" onClick={e=>{history.push("/seller/add", getCurrentAccount())}}>Add Seller</Button>
        </div>
    );
}