//Send token to server , get user data in return 
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';

function getUserData(inputHeaders, endPoint) {

    const config = {
        headers: inputHeaders
    };

    return axios.get(endPoint, config )
}

export default function useUserData(endPoint, inputHeaders = '') {

    const headers = {}
    // Set the headers
    Object.entries(inputHeaders).forEach(([key, value]) => {
        headers[key] = value;
    });

    
    // const key = localStorage.getItem('Key').replace(/"/g, '')

    const userData = useQuery(['getRequest', headers], () => getUserData(headers, endPoint),{staleTime: (1000 * 60) * 3})

    return userData

} 