import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HeaderComponent from './Componentes/HeaderComponent';
//import FooterComponent from './Componentes/FooterComponent';
import PersonaIni from './Componentes/PersonasIni';
import PersonasAddEdit from './Componentes/PersonasAddEdit';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
        <HeaderComponent />
         <div className="container">
          <Switch>
            <Route path="/" exact component={PersonaIni}></Route>
            <Route path = "/personas/:resp" component = {PersonaIni}></Route>
            <Route path = "/personas" component = {PersonaIni}></Route>
            <Route path = "/add-personas/:id" component = {PersonasAddEdit}></Route>
          </Switch>
         </div>
        {/* <FooterComponent /> */}
        </Router>
      </div>
    );
  }
}
export default App;
