import React from 'react';
import { BrowserRouter, Link as Nav, Route, Switch } from 'react-router-dom';
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import SellerPage from './pages/SellerPage';
import AddSellerPage from './pages/AddSellerPage';
import { Box, Container } from '@material-ui/core';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import MyPage from './pages/MyPage';
import OrdersPage from './pages/OrdersPage';
import OrderPage from './pages/OrderPage';
import TopBar from './TopBar';
import { PrivateRoute } from './baemin/BaeminHooks';

function App() {
  return (
    <BrowserRouter>
      <TopBar/>
      <Container>
        <Box my={2}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <PrivateRoute path="/seller/add" component={AddSellerPage} />
            <Route path="/seller" component={SellerPage} />
            <PrivateRoute path="/product/add" component={AddProductPage} />
            <PrivateRoute path="/cart" component={CartPage} />
            <PrivateRoute path="/order" component={OrderPage} />
            <PrivateRoute path="/orders" component={OrdersPage} />
            <PrivateRoute path="/me" component={MyPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
