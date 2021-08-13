import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link as Nav, Route, Switch } from 'react-router-dom';
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import SellerPage from './pages/SellerPage';
import AddSellerPage from './pages/AddSellerPage';
import { AppBar, Button, IconButton, Toolbar, Typography, makeStyles, Link, Container } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { Account, addSigninListener, removeSigninListener, signout } from './baemin/Baemin';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import MyPage from './pages/MyPage';
import OrdersPage from './pages/OrdersPage';
import OrderPage from './pages/OrderPage';

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
  let signupLink: any;
  if(account) {
    signinLink = <Link component={Nav} to="/me" variant="button" color="inherit" className={classes.link}>{account.name}</Link>
    signoutLink = <Button color="inherit" onClick={e=>{signout()}}>Sign-out</Button>
 }
  else {
    signupLink = <Link component={Nav} to="/signup" variant="button" color="inherit" className={classes.link}>Sign-up</Link>
    signinLink = <Link component={Nav} to="/signin" variant="button" color="inherit" className={classes.link}>Sign-in</Link>
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
          {signupLink}
          {signinLink}
          {signoutLink}
        </Toolbar>
      </AppBar>
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signin" component={SigninPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/seller/add" component={AddSellerPage} />
          <Route path="/seller" component={SellerPage} />
          <Route path="/product/add" component={AddProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/order" component={OrderPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/me" component={MyPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
