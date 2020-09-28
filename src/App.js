import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './Componentes/HeaderComponent';
import FooterComponent from './Componentes/FooterComponent';

class App extends Component {

  render() {
    return (
      <div>
        <HeaderComponent />
         <div className="container">
            Principal
         </div>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
