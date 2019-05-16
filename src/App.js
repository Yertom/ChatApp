import React, { Component } from 'react';
import AppContainer from "./components/AppContainer/AppContainer";
import LogInForm from "./components/LogInForm/LogInForm";
import { BrowserRouter, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
           <Route exact path={"/"} component={LogInForm}/>
           <Route exact path={"/:user"} component={AppContainer}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
