import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link as Nav, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SellerDetailsPage from './pages/SellerDetailsPage';
import AddSellerPage from './pages/AddSellerPage';
import ErrorPage from './pages/Error';
import { AppBar, Button, IconButton, Toolbar, Typography, makeStyles, Link } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Account, addSigninListener, removeSigninListener, signout } from './baemin/Baemin';
import AddProductPage from './pages/AddProductPage';

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

function App() {
  const classes = useStyles();
  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    addSigninListener(setAccount);
    return ()=> {
      removeSigninListener(setAccount);
    }
  }, []);
  let signinLink: any;
  let signoutLink: any;
  if(account) {
    signinLink = <Typography>{account.name}</Typography>
    signoutLink = <Button color="inherit" onClick={e=>{signout()}}>Sign-out</Button>
 }
  else {
    signinLink = <Link component={Nav} to="/login" variant="button" color="inherit" className={classes.link}>Sign-in</Link>
  }
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BAEMIN
          </Typography>
          <Link component={Nav} to="/" variant="button" color="inherit" className={classes.link}>Home</Link>
          {signinLink}
          {signoutLink}
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/seller/add" component={AddSellerPage} />
        <Route path="/seller" component={SellerDetailsPage} />
        <Route path="/product/add" component={AddProductPage} />
        <Route path="/not-found" component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
