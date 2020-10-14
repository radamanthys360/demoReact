import React, { Component } from 'react'
import PersonasService from '../services/PersonasServices'
import AlertErrorComponent from '../Componentes/AlertErrorComponent'
import "../Componentes/PersonasAddEdit.css";
import * as moment from 'moment'

class PersnasAddEditComponent extends Component {

    constructor(props) {
        super()

        this.state = {
            id: props.match.params.id,
            nombre: '',
            direccion: '',
            documentoIdentidad: '',
            fechaNacimiento: '',
            sexo: '',
            usuario: '',
            clave: '',
            clave2: '',
            hasError: false,
            errorMessage: '',
            errors: []
        }

        this.saveOrUpdate = this.saveOrUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
           // cuando se modifique
        }        
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    handleInputChange(event) {
        var key = event.target.name;
        var value = event.target.value;
        var obj = {};
        obj[key] = value;
        this.setState(obj);
    }

    cancelar(){
        this.props.history.push('/personas');
    }

    getTitulo(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Agregar</h3>
        }else{
          // para actualizar
        }
    }

    getError(){
        if(this.state.hasError){
            return <AlertErrorComponent mostrar = 'true' error = {this.state.errorMessage}/> 
        }else{
          return (null)
        }
    }

    validation(){
        var errors = [];

        if (this.state.nombre === "") {
            errors.push("nombre");
        }
        if (this.state.nombre.length <= 3) {
            errors.push("nombre");
        }

        if (this.state.direccion === "") {
            errors.push("direccion");
        }
        if (this.state.direccion.length <= 1) {
            errors.push("direccion");
        }

        if (this.state.documentoIdentidad === "") {
            errors.push("documentoIdentidad");
        }
        if (this.state.documentoIdentidad.length < 12) {
            errors.push("documentoIdentidad");
        }

        if (this.state.fechaNacimiento === "") {
            errors.push("fechaNacimiento");
        }

        if (this.state.clave === "") {
            errors.push("clave");
        }
        if (this.state.clave.length <= 6) {
            errors.push("clave");
        }

        if (this.state.clave2 === "") {
            errors.push("clave2");
        }
        if (this.state.clave2.length <= 6) {
            errors.push("clave2");
        }
        if (this.state.sexo === "" || this.state.sexo === "NA") {
            errors.push("sexo");
        }
        if (this.state.usuario === "") {
            errors.push("usuario");
        }
        if (this.state.usuario.length <= 3) {
            errors.push("usuario");
        }
        if (this.state.clave !== this.state.clave2) {
            errors.push("claveV");
        }

        this.setState({
            errors: errors
        });

        if (errors.length > 0) {
            return false;
          } else {
            return true;
        }
    }

    getClassUsuario(){
        if(this.hasError("usuario")){
            return "form-control is-invalid"
        }else if(this.hasError("usuarioV")){
          return "form-control is-invalid"
        }else{
            return "form-control"
        }
    }

    getClassClave(){
        if(this.hasError("clave") || this.hasError("clave2")){
            return "form-control is-invalid"
        }else if(this.hasError("claveV")){
          return "form-control is-invalid"
        }else{
            return "form-control"
        }
    }

     saveOrUpdate = (e) => {
        e.preventDefault();
        if (! this.validation()) {
            return false;
        } else {
            var errors = [];
            PersonasService.getFindByUsuario(this.state.usuario).then((res) => {
                if(res.data) {
                    errors.push("usuarioV");
                    this.setState({
                        errors: errors
                    });
                }else{
                    let personas = {
                        nombre: this.state.nombre,
                        direccion: this.state.direccion,
                        documentoIdentidad: this.state.documentoIdentidad,
                        fechaNacimiento: moment(this.state.fechaNacimiento).format("DD-MM-YYYY"),
                        sexo: this.state.sexo,
                        usuario: this.state.usuario,
                        clave: this.state.clave,
                    };
                    console.log('personas => ' + JSON.stringify(personas));
                    if (this.state.id === '_add') {
                        PersonasService.create(personas).then(res => {
                            this.props.history.push('/personas/_0');
                        }).catch(err => {
                            this.setState({
                                hasError: true,
                                errorMessage: err.message
                            });
                        });
                    } else {
                        //para actualizar
                    }
                } 
            }).catch(err => {
                this.setState({
                    hasError: true,
                    errorMessage: err.message
                });
            });

        }

    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitulo()
                                }
                                {
                                    this.getError()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nombre: </label>
                                            <input placeholder="Nombre Completo " name="nombre" className="form-control" 
                                                value={this.state.nombre} onChange={this.handleInputChange}
                                                className={this.hasError("nombre") ? "form-control is-invalid"
                                                                                        : "form-control" }/>
                                                <div
                                                  className={this.hasError("nombre") ? "inline-errormsg" : "hideDiv"}>
                                                     Por favor ingresa un valor valido.
                                                </div>
                                        </div>

                                        <div className = "form-group">
                                            <label> Direccion: </label>
                                            <textarea  placeholder="Direccion " rows="3" name="direccion" className="form-control" 
                                                value={this.state.direccion} onChange={this.handleInputChange}
                                                className={this.hasError("direccion") ? "form-control is-invalid"
                                                : "form-control" }/>
                                                <div
                                                  className={this.hasError("direccion") ? "inline-errormsg" : "hideDiv"}>
                                                     Por favor ingresa un valor valido.
                                                </div>
                                        </div>

                                        <div className = "form-group">
                                            <label> Documento de Identidad: </label>
                                            <input placeholder="0000-0000-00" name="documentoIdentidad" className="form-control" 
                                                value={this.state.documentoIdentidad} onChange={this.handleInputChange}
                                                className={this.hasError("documentoIdentidad") ? "form-control is-invalid"
                                                : "form-control" }/>
                                                <div
                                                  className={this.hasError("documentoIdentidad") ? "inline-errormsg" : "hideDiv"}>
                                                     Por favor ingresa un valor valido.
                                                </div>
                                        </div>

                                        <div className = "form-group">
                                            <label> Fecha Nacimiento: </label>
                                            <input type="date" name="fechaNacimiento" className="form-control" 
                                                value={this.state.fechaNacimiento} onChange={this.handleInputChange}
                                                className={this.hasError("fechaNacimiento") ? "form-control is-invalid"
                                                : "form-control" }/>
                                                <div
                                                  className={this.hasError("fechaNacimiento") ? "inline-errormsg" : "hideDiv"}>
                                                     Por favor ingresa un valor valido.
                                                </div>
                                        </div>

                                        <div className="form-group">
                                            <label> Genero : </label>
                                            <select name="sexo" class="custom-select" value={this.state.sexo} onChange={this.handleInputChange}
                                            className={this.hasError("sexo") ? "custom-select is-invalid"
                                                                                   : "custom-select" }>
                                                <option value="NA" selected>Selecciona uno</option>
                                                <option value="MASCULINO">Masculino</option>
                                                <option value="FEMENINO">Femenino</option>
                                            </select>
                                            <div
                                                  className={this.hasError("sexo") ? "inline-errormsg" : "hideDiv"}>
                                                     Por favor selecciona un valor.
                                            </div>
                                        </div>

                                        <div className = "form-group">
                                            <label> Nombre Usuario : </label>
                                            <input name="usuario" className="form-control" placeholder="Nombre usuario "
                                                value={this.state.usuario} onChange={this.handleInputChange}
                                                className={this.getClassUsuario()}/>
                                                <div
                                                  className={this.hasError("usuario") ? "inline-errormsg" : "hideDiv"}>
                                                     Por favor ingresa un valor valido.
                                                </div>
                                                <div
                                                  className={this.hasError("usuarioV") ? "inline-notvalid " : "hideDiv"}>
                                                     Usuario ya existe.
                                                </div>
                                        </div>

                                        <div className = "form-group">
                                            <label> Contraseña : </label>
                                            <input type="password" name="clave" className="form-control" aria-describedby="passwordHelpInline"
                                                value={this.state.clave} onChange={this.handleInputChange}
                                                className={this.getClassClave()}/>
                                                <div
                                                  className={this.hasError("clave") ? "inline-errormsg" : "hideDiv"}>
                                                     Por favor ingresa un valor valido.
                                                </div>
                                                <div
                                                  className={this.hasError("claveV") ? "inline-notclave" : "hideDiv"}>
                                                     Las claves no coinciden.
                                                </div>
                                                <small id="passwordHelpInline" class="text-muted">
                                                    Debe de contener minimo 6 y maximo 20 caracteres.
                                                </small>
                                        </div>

                                        <div className = "form-group">
                                            <label> Ingresa de nuevo la contraseña : </label>
                                            <input type="password" name="clave2" className="form-control" aria-describedby="passwordHelpInline"
                                                value={this.state.clave2} onChange={this.handleInputChange}
                                                className={this.getClassClave()}/>
                                                <div
                                                  className={this.hasError("clave2") ? "inline-errormsg" : "hideDiv"}>
                                                     Por favor ingresa un valor valido.
                                                </div>
                                                <div
                                                  className={this.hasError("claveV") ? "inline-notclave" : "hideDiv"}>
                                                     Las claves no coinciden.
                                                </div>
                                                <small id="passwordHelpInline" class="text-muted">
                                                    Debe de contener minimo 6 y maximo 20 caracteres.
                                                </small>
                                        </div>

                                        <button className="btn btn-primary" onClick={this.saveOrUpdate}>Guardar</button>
                                        <button className="btn btn-danger" onClick={this.cancelar.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                      </div> 
            </div>
        )
    }
}
export default PersnasAddEditComponent

