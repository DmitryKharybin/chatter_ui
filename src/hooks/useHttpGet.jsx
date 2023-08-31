//Send token to server , get user data in return 
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';

function getData(inputHeaders, endPoint) {

    const config = {
        headers: inputHeaders
    };

    return axios.get(endPoint, config)
}

export default function useUserData(endPoint, inputHeaders = '', ...uniqueIdentifier) {

    const headers = {}
    // Set the headers
    Object.entries(inputHeaders).forEach(([key, value]) => {
        headers[key] = value;
    });


    const userData = useQuery(uniqueIdentifier, () => getData(headers, endPoint), { staleTime: (1000 * 60) * 3 })
    //const userData = useQuery([uniqueIdentifier], () => getData(headers, endPoint))

    return userData

} 