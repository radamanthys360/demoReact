import React, { Component } from 'react'
//import EmployeeService from '../services/PersonasServices'
import AlertConfirmComponent from '../Componentes/AlertConfirmComponent'


class PersonaIniComponent extends Component {

    constructor(props) {
        super()

        this.state = {
            resp: props.match.params.resp,
            error: props.match.params.error
        }

        this.addPersona = this.addPersona.bind(this);
    }

    addPersona(){
        this.props.history.push('/add-personas/_add');
    }

    getMensaje(){
        if(this.state.resp === '_0'){
            return <AlertConfirmComponent /> 
        }else{

        }
    }

    render() {
        return (
            <div>
                <br></br>
                { 
                 this.getMensaje()
                }
                 <h2 className="text-center">Mantenimiento Personas</h2>
                 <div className = "row">
                    <button className="btn btn-success" onClick={this.addPersona}> Agregar</button>
                 </div>
                 <br></br>
            </div>
        )
    }
}
export default PersonaIniComponent