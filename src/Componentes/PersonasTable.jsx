import React, { Component,useState } from 'react'
import PersonasService from '../services/PersonasServices'
import * as moment from 'moment'
import { withRouter } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import AlertErrorComponent from '../Componentes/AlertErrorComponent'
import AlertConfirmComponent from '../Componentes/AlertConfirmComponent'

class PersonaTableComponent extends Component {

    constructor(props) {
        super()

        this.state = {
                pagina : 0,
                size : 5,
                personas: [],
                totalPages: '',
                totalElements: '',
                paginas: [],
                page: '',
                busqueda : '',
                show : false,
                id : ''
        }
        this.paginationNav = this.paginationNav.bind(this);
        this.busquedaTexto = this.busquedaTexto.bind(this);
        this.limpiarBusqueda = this.limpiarBusqueda.bind(this);
        this.editPersona = this.editPersona.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deletePersona = this.deletePersona.bind(this);
    }

    componentDidMount(){
        PersonasService.getAllPageable(this.state.pagina,this.state.size).then((res) => {
            this.setState({ personas: res.data.content,
                            totalPages : res.data.totalPages,
                            totalElements : res.data.totalElements,
                            page : 1,
                            busqueda : 1});
            this.getPagination();
        });
    }

    limpiarBusqueda= (e) => {
        e.preventDefault();
        PersonasService.getAllPageable(this.state.pagina,this.state.size).then((res) => {
            this.setState({ personas: res.data.content,
                            totalPages : res.data.totalPages,
                            totalElements : res.data.totalElements,
                            page : 1,
                            busqueda : 1});
            this.getPagination();
        });
      }

    busquedaTexto= (e) => {
        e.preventDefault();
        PersonasService.getFindAllText(this.state.pagina,this.state.size,this.state.textoS).then((res) => {
            this.setState({ personas: res.data.content,
                            totalPages : res.data.totalPages,
                            totalElements : res.data.totalElements,
                            page : 1,
                            busqueda : 2});
            this.getPagination();
        });
      }

    paginationNav= pag => e => {
      e.preventDefault();
      if (this.state.busqueda === 1){
        PersonasService.getAllPageable((pag - 1),this.state.size).then((res) => {
            this.setState({ personas: res.data.content,
                            totalPages : res.data.totalPages,
                            totalElements : res.data.totalElements,
                            page : pag,
                            busqueda : 1});
            this.getPagination();
          });
      }else{
        PersonasService.getFindAllText((pag - 1),this.state.size,this.state.textoS).then((res) => {
            this.setState({ personas: res.data.content,
                            totalPages : res.data.totalPages,
                            totalElements : res.data.totalElements,
                            page : pag,
                            busqueda : 2});
            this.getPagination();
        });
      }
    }

    getPagination(){
        let pages = this.state.totalPages;
        let paginasA = []
          for (let i = 1; i <= pages; i++){
            var elementoPag = new Object();
            elementoPag.id = i
            if(i === this.state.page ){
                elementoPag.css = 'page-item active' 
            }else{
                elementoPag.css = 'page-item'  
            }
            paginasA[(i -1)] = elementoPag  
        }
        this.setState({ paginas : paginasA });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    editPersona(id){
        this.props.history.push(`/add-personas/${id}`);
    }

    deletePersona(){
        PersonasService.delete(this.state.id).then(res => {
            this.setState({
                id : '',
                show : false,
                resp : '0'})

            PersonasService.getAllPageable(this.state.pagina,this.state.size).then((res) => {
                this.setState({ personas: res.data.content,
                                totalPages : res.data.totalPages,
                                totalElements : res.data.totalElements,
                                page : 1,
                                busqueda : 1});
                this.getPagination();
            });  
        }).catch(err => {
            this.setState({
                show : false,
                hasError: true,
                errorMessage: err.message
            });
       });
    }

    getMensaje(){
        //console.log('getMensaje '+ this.state.resp)
        if(this.state.resp === '0'){
            return <AlertConfirmComponent /> 
        }
    }

    getError(){
        if(this.state.hasError){
            return <AlertErrorComponent mostrar = 'true' error = {this.state.errorMessage}/> 
        }else{
          return (null)
        }
    }

    handleOpen(id){
        this.setState({
            id : id,
            show : true})
    }

    handleClose(){
        this.setState({show : false})
    }

    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Informacion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Esta Seguro que desea eliminar el registro?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose} >
                        Cancelar
                    </Button>
                    <Button variant="btn btn-success" onClick={this.deletePersona}>
                        Aceptar
                    </Button>
                    </Modal.Footer>
                </Modal>
                {
                    this.getError()
                }
                { 
                 this.getMensaje()
                }
                <nav class="navbar navbar-light justify-content-end" >
                   <form class="form-inline float-sm-right">
                    <input class="form-control mr-sm-2" name="textoS" type="search" onChange={this.handleChange} placeholder="Buscar" aria-label="Search"/>
                    <button class="btn btn-success" onClick={this.busquedaTexto} type="submit">Buscar</button>
                    <button class="btn btn-secondary" onClick={this.limpiarBusqueda} type="submit">Limpiar</button>
                   </form>
                </nav> 
                 <div className = "container">   
                 <div class="table-responsive-sm">
                        <table className = "table table-hover">
                             <caption>Pagina {this.state.page} de {this.state.totalPages} Total de registros {this.state.totalElements}</caption>
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col"> Nombre Completo</th>
                                    <th scope="col"> Direccion</th>
                                    <th scope="col"> Documento Identidad</th>
                                    <th scope="col"> Fecha Nacimiento</th>
                                    <th scope="col"> Genero</th>
                                    <th scope="col"> Usuario</th>
                                    <th scope="col"> Modificar</th>
                                    <th scope="col"> Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.personas.map(
                                        persona => 
                                        <tr key = {persona.id}>
                                             <td> {persona.nombre} </td>   
                                             <td> {persona.direccion}</td>
                                             <td> {persona.documentoIdentidad}</td>
                                             <td> {moment(persona.fechaNacimiento).format("DD-MM-YYYY")}</td>
                                             <td> {persona.sexo}</td>
                                             <td> {persona.usuario}</td>
                                             <td>
                                              <button onClick={ () => this.editPersona(persona.id)} className="btn btn-success">Modificar</button>
                                             </td>
                                             <td>
                                              <button onClick={ () => this.handleOpen(persona.id)} className="btn btn-success">Eliminar</button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                         <nav aria-label>
                            <ul class="pagination justify-content-center">
                              {this.state.paginas.map(pagina => (
                                <li class={pagina.css}>
                                 
                                 <a href="#" class="page-link" onClick={this.paginationNav(pagina.id)} >{pagina.id}</a>
                                </li>
                              ))}
                            </ul>
                        </nav>
                    </div>    
                 </div>
            </div>
        )
    }
}

export default withRouter(PersonaTableComponent)