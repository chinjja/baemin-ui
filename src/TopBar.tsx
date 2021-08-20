import React from 'react';
import { Link as Nav, useHistory } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, makeStyles, Link } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { signout } from './baemin/Baemin';
import { useAuth } from './baemin/BaeminHooks';

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
    const auth = useAuth();
    
  let signinLink: any;
  let signoutLink: any;
  let signupLink: any;
  if(auth) {
    signinLink = <Link component={Nav} to="/account" variant="button" color="inherit" className={classes.link}>{auth.name}</Link>
    signoutLink = <Button color="inherit" onClick={()=>{signout(); history.replace("/")}}>Sign-out</Button>
 }
  else {
    signupLink = <Link component={Nav} to="/signup" variant="button" color="inherit" className={classes.link}>Sign-up</Link>
    signinLink = <Link component={Nav} to="/signin" variant="button" color="inherit" className={classes.link}>Sign-in</Link>
  }
    return (
    <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Link component={Nav} to="/" variant="h6" color="inherit" className={classes.title}>
            BAEMIN
          </Link>
          {signupLink}
          {signinLink}
          {signoutLink}
        </Toolbar>
      </AppBar>
    )
}