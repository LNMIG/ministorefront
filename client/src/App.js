import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Cart from './pages/cart/cart'
import Error404 from './pages/error404/error404';
import LandingPage from './pages/landing/landing'
import CheckoutMain from './pages/checkout/checkoutMain';
import ProductsList from "./pages/productList/productList";
import ProductDetail from './pages/productDetail/productDetail';

class App extends Component {
  render () {
      return (
        <div>
          <Switch>
            <Route exact path='/' component={ LandingPage } />
            <Route exact path='/productslist/:category' component={ ProductsList } />
            <Route exact path='/productdetails/:id' component={ ProductDetail } />
            <Route exact path='/cart' component={ Cart } />
            <Route exact path='/checkout' component={ CheckoutMain }/>
            <Route path='/*' component={ Error404 } />
          </Switch>
        </div>
      )
  }
}
export default App;