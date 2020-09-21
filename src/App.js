import React, { Component } from 'react';
import './App.css';
import Taringuero from './Componentes/Taringuero';

class App extends Component {
  state = {
    taringos: [
      { nombre: 'radamantis17', edad: 29 },
      { nombre: 'virgoconmani', edad: 25 },
      { nombre: 'la polaca', edad: 35 }
    ]
  };

  switchNombreHandler = () => {
    this.setState({
      taringos: [
        { nombre: 'radamantis17', edad: 29 },
        { nombre: 'El facha', edad: 25 },
        { nombre: 'la polaca', edad: 35 }
      ]
    });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.switchNombreHandler}>Cambiar Taringuero</button>
        <Taringuero
          nombre={this.state.taringos[0].nombre}
          edad={this.state.taringos[0].edad}
        />
        <Taringuero
          nombre={this.state.taringos[1].nombre}
          edad={this.state.taringos[1].edad}
        >Todas putas menos conmigo!!</Taringuero>
        <Taringuero
          nombre={this.state.taringos[2].nombre}
          edad={this.state.taringos[2].edad}
        />
      </div>
    );
  }
}

export default App;
