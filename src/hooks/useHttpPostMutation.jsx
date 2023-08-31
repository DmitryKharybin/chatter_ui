//This custom hook handle post requests (Mutations)

import { useMutation } from "@tanstack/react-query";
import axios from 'axios';



export default function useHttpPostMutation() {


    const mutation = useMutation(({ endPoint, headers, body = '' }) => {
  

        return axios.post(endPoint, body, {headers: headers})
    })


    return mutation;

}