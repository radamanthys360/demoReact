 import axios from 'axios';

const PERSONAS_API_BASE_URL = "http://localhost:8080/demoTaringa/api/personas";

// otros metodos
const FIND_BY_USUARIO = "/findByUsuario";

class PersonasService {

    async getFindByUsuario(nombreUsuario){
        return axios.get(PERSONAS_API_BASE_URL + FIND_BY_USUARIO 
            +  '/' + nombreUsuario);
    }

    getAllPageable(page,size){
        let pageable = "pageable?page="+page+'&size='+size
        return axios.get(PERSONAS_API_BASE_URL+ '/' + pageable);
    }
    
    getFindAllText(page,size,texto){
        let pageable = "pageable?page="+page+'&size='+size
        return axios.get(PERSONAS_API_BASE_URL+ '/' +texto+ '/' + pageable);
    } 

    getAll(){
        return axios.get(PERSONAS_API_BASE_URL);
    }

    create(personas){
        return axios.post(PERSONAS_API_BASE_URL, personas);
    }

    getById(personasId){
        return axios.get(PERSONAS_API_BASE_URL + '/' + personasId);
    }

    update(personas, personasId){
        return axios.put(PERSONAS_API_BASE_URL + '/' + personasId, personas);
    }

    delete(personasId){
        return axios.delete(PERSONAS_API_BASE_URL + '/' + personasId);
    }
}

export default new PersonasService() 