import { useState, useEffect} from "react";
import useHttpPostMutation from "../../hooks/useHttpPostMutation";
import { useNavigate } from "react-router-dom";
import Form from '../Form/Form'

export default function LoginPage() {

    const API = import.meta.env.VITE_BACKEND_CHATTER_API;
    const USER_ENDPOINT = import.meta.env.VITE_BACKEND_USER_ENDPOINT;
    const navigate = useNavigate();

    const{mutate, isSuccess, isError, data, isLoading} = useHttpPostMutation()
    
    const userEndPoint = `${API}/${USER_ENDPOINT}/Login`


    function onSubmitHandler(data){
        mutate({endPoint: userEndPoint, body: data})
    }
   
  
    useEffect(() => {
        if (isSuccess) {
          localStorage.setItem("Key", data.data);
          navigate("/profile");
        }
      }, [isSuccess, data]);
  
   
    if(isError){
      return(
        <div>
          <h1>Something went wrong</h1>
        </div>
  
      )
    }
  
    if(isLoading){
      return(
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }


    return (
        <div>
            <h2>Login Page</h2>
        <Form submitHandler={onSubmitHandler}></Form>
        </div>
    )
}