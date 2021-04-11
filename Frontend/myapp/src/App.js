
import React, { Component } from "react";
import {
  BrowserRouter as Router, 
  Route,
  Switch,
  Redirect
} from "react-router-dom";

/**
 * Class App defines the routes for all kinds of websites.
 * App will check each Routes by order and if none of routes has been found, it will redirect to 404 page!
 */

import MainPage from "./pages";
import NotFoundPage from "./pages/404";
import Search from "./pages/search"
import Inventory from "./pages/inventory"
class App extends Component{
  render() {
    return (
      <div >
        <Router>
          <Switch>
          <Route exact path ="/" component={MainPage} />
          <Route exact path = "/404" component={NotFoundPage} />
          <Route exact path = '/search' component={Search} />
          <Route exact path = '/inventory' component={Inventory} />
          <Redirect to="/404"/>
          </Switch>
         </Router>
  
      </div>
      
    );
  }
  
}

export default App;
