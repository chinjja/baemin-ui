import React, { useEffect, useState } from 'react';
import { Link as Nav, useHistory } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, Typography, makeStyles, Link } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Account, addSigninListener, initSign, removeSigninListener, signout } from './baemin/Baemin';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    padding: 4,
  }
}));

export default function TopBar() {
    const classes = useStyles();
    const history = useHistory();
    const [account, setAccount] = useState<Account>();
    useEffect(() => {
        initSign();
        addSigninListener(setAccount);
        return ()=> {
          removeSigninListener(setAccount);
        }
      }, []);
  let signinLink: any;
  let signoutLink: any;
  let signupLink: any;
  if(account) {
    signinLink = <Link component={Nav} to="/me" variant="button" color="inherit" className={classes.link}>{account.name}</Link>
    signoutLink = <Button color="inherit" onClick={()=>{signout(); history.replace("/")}}>Sign-out</Button>
 }
  else {
    signupLink = <Link component={Nav} to="/signup" variant="button" color="inherit" className={classes.link}>Sign-up</Link>
    signinLink = <Link component={Nav} to="/signin" variant="button" color="inherit" className={classes.link}>Sign-in</Link>
  }
    return (
    <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BAEMIN
          </Typography>
          <Link component={Nav} to="/" variant="button" color="inherit" className={classes.link}>Home</Link>
          {signupLink}
          {signinLink}
          {signoutLink}
        </Toolbar>
      </AppBar>
    )
}