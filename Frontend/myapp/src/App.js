
import React, { Component } from "react";
import {
  BrowserRouter as Router, 
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import MainPage from "./pages";
import NotFoundPage from "./pages/404";
import Search from "./pages/search"
import Inventory from "./pages/inventory"
class App extends Component{
  render() {
    return (
      <div className="App">
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
