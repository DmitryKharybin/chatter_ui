import axios from 'axios'

const API = import.meta.env.VITE_BACKEND_CHATTER_API;
const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_DATA_ENDPOINT;


export default class DataService {

    userEndPoint = `${API}/${DATA_ENDPOINT}/`


    //Send token to server , get user data in return 
    getUserData(token) {

        const header = `Authorization: ${token}`;

        return axios.get(this.userEndPoint + 'GetUserData', {headers: {authorization: token}})

    }

}