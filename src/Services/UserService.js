import axios from 'axios'

const API = import.meta.env.VITE_BACKEND_CHATTER_API;
const USER_ENDPOINT = import.meta.env.VITE_BACKEND_USER_ENDPOINT;


export default class UserService {

    userEndPoint = `${API}/${USER_ENDPOINT}/`

    //Return JWT from server
    login(username, password) {

        return axios.post(this.userEndPoint + 'Login', {
            "userName": username,
            "password": password
        })
    }

    //Post new user
    //Post new user
    RegisterUser(name, username, password, email) {

        return axios.post(this.userEndPoint + 'RegisterUser', {
            responseType: 'json', data: {
                "Name": name,
                "userName": username,
                "password": password,
                "email": email
            }
        })
    }

    RegisterAdmin(name, username, password, email) {

        return axios.post(this.userEndPoint + 'RegisterAdmin', {
            responseType: 'json', data: {
                "Name": name,
                "userName": username,
                "password": password,
                "email": email
            }
        })
    }

}