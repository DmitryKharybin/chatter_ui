import axios from 'axios'

const API = import.meta.env.VITE_BACKEND_CHATTER_API;
const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_DATA_ENDPOINT;


export default class DataService {

    //key = localStorage.getItem('Key');



    userEndPoint = `${API}/${DATA_ENDPOINT}/`


    //Send token to server , get user data in return 
    getFriendRequests(key) {


        const config = this.createBearerToken(key);
        return axios.get(this.userEndPoint + 'GetFriendRequests', config)

    }

    getFriendList(key) {
        const config = this.createBearerToken(key);
        return axios.get(this.userEndPoint + 'GetFriends', config)
    }


    createBearerToken(key) {
        return {
            headers: {
                'Authorization': 'Bearer ' + key
            }
        };
    }

}