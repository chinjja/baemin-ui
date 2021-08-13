import React from 'react';
import { BrowserRouter, Link as Nav, Route, Switch } from 'react-router-dom';
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import SellerPage from './pages/SellerPage';
import AddSellerPage from './pages/AddSellerPage';
import { Container } from '@material-ui/core';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import MyPage from './pages/MyPage';
import OrdersPage from './pages/OrdersPage';
import OrderPage from './pages/OrderPage';
import TopBar from './TopBar';

function App() {
  return (
    <BrowserRouter>
      <TopBar/>
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
