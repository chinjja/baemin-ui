import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import SellerPage from './pages/SellerPage';
import AddSellerPage from './pages/AddSellerPage';
import { Box, Container, ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core';
import AddProductPage from './pages/AddProductPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import OrderPage from './pages/OrderPage';
import TopBar from './TopBar';
import { PrivateRoute } from './baemin/BaeminHooks';
import AccountSellersPage from './pages/AccountSellersPage';
import AccountSellerPage from './pages/AccountSellerPage';
import ProductPage from './pages/ProductPage';
import AccountProductPage from './pages/AccountProductPage';
import InvalidPage from './pages/InvalidPage';
import AddressPage from './pages/AddressPage';
import AddressesPage from './pages/AddressesPage';
import AddAddressPage from './pages/AddAddressPage';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <ThemeProvider theme = {theme}>
      <BrowserRouter>
        <TopBar/>
        <Container>
          <Box my={2}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/signin" component={SigninPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/seller" component={SellerPage} />
              <Route exact path="/order" component={OrderPage} />
              <Route exact path="/product" component={ProductPage} />
              <Route exact path="/address" component={AddressPage} />
              <PrivateRoute exact path="/account/seller/add" component={AddSellerPage} />
              <PrivateRoute exact path="/account/sellers" component={AccountSellersPage} />
              <PrivateRoute exact path="/account/seller" component={AccountSellerPage} />
              <PrivateRoute exact path="/account/product/add" component={AddProductPage} />
              <PrivateRoute exact path="/account/product" component={AccountProductPage} />
              <PrivateRoute exact path="/account/cart" component={CartPage} />
              <PrivateRoute exact path="/account/orders" component={OrdersPage} />
              <PrivateRoute exact path="/account/address/add" component={AddAddressPage} />
              <PrivateRoute exact path="/account/addresses" component={AddressesPage} />
              <PrivateRoute exact path="/account" component={AccountPage} />
              <Route path="/invalid" component={InvalidPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Box>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
