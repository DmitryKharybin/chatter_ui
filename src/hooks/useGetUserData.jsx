//Send token to server , get user data in return 
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';

function getUserData(endPoint) {

    const key = localStorage.getItem('Key');
    

    const config = {
        headers: {
            'Authorization': 'Bearer ' + key
        }
    };

    return axios.get(endPoint, config)
}

export default function useUserData() {

    

    const API = import.meta.env.VITE_BACKEND_CHATTER_API;
    const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_DATA_ENDPOINT;

    const endpoint = `${API}/${DATA_ENDPOINT}/GetMyUserData`;


    const userData = useQuery(['MyUserData'], () => getUserData(endpoint), { staleTime: (1000 * 60) * 3 })

    return userData

} 