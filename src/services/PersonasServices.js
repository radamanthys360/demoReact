/* import axios from 'axios';

const PERSONAS_API_BASE_URL = "http://localhost:8080/demoTaringa/api/personas";

class PersonasService {

    getEmployees(){
        return axios.get(PERSONAS_API_BASE_URL);
    }

    createEmployee(personas){
        return axios.post(PERSONAS_API_BASE_URL, personas);
    }

    getEmployeeById(personasId){
        return axios.get(PERSONAS_API_BASE_URL + '/' + personasId);
    }

    updateEmployee(personas, personasId){
        return axios.put(PERSONAS_API_BASE_URL + '/' + personasId, personas);
    }

    deleteEmployee(personasId){
        return axios.delete(PERSONAS_API_BASE_URL + '/' + personasId);
    }
}

export default new PersonasService() */