import axios from 'axios'

const API = import.meta.env.VITE_BACKEND_CHATTER_API;
const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_USER_ENDPOINT;


export default class DataService {

    userEndPoint = `${API}/${DATA_ENDPOINT}/`


    //Send token to server , get user data in return 
    GetUserData(token) {

        const header = `Authorization: Bearer ${token}`;

        return axios.get(this.userEndPoint + 'Login', {headers: {header}})

    }

}