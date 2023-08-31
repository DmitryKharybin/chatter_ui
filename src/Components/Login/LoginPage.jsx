import { useState, useEffect, useContext, useReducer } from "react";
import useHttpPostMutation from "../../hooks/useHttpPostMutation";
import { useNavigate } from "react-router-dom";
import Form from '../Form/Form'
import * as yup from 'yup';
import { Link } from "react-router-dom";
import { UserContext } from "../../App";



export default function LoginPage() {

  const API = import.meta.env.VITE_BACKEND_CHATTER_API;
  const USER_ENDPOINT = import.meta.env.VITE_BACKEND_USER_ENDPOINT;
  const navigate = useNavigate();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  // const loginStatus = useContext(UserContext)

  const { login } = useContext(UserContext);
  const [loginState, setLoginState] = login;

  const { mutate, isSuccess, isError, data, isLoading } = useHttpPostMutation()

  const userEndPoint = `${API}/${USER_ENDPOINT}/Login`

  const schema = yup.object({
    userName: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  })

  const inputs = [
    {
      name: 'userName',
      placeHolder: 'Enter user name',
      type: 'text',
      id: 'user_name'
    },
    {
      name: 'password',
      placeHolder: 'Enter password',
      type: 'password',
      id: 'pswrd'
    }
  ]


  function onSubmitHandler(data) {
    mutate({ endPoint: userEndPoint, body: data })
  }


  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("Key", data.data);
      setLoginState(true);
      navigate("/profile");
    }
  }, [isSuccess, data]);


  if (isError) {
    return (
      <div>
        <h1>Something went wrong</h1>
        <button>Try Again</button>
      </div>

    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }


  return (
    <div>
      <div>
        <h2>Login Page</h2>
        <Form schema={schema} submitHandler={onSubmitHandler} inputs={inputs}></Form>
      </div>
      <div>
        <p>Don't have an account ?</p><Link to={'/register'}>Register</Link>
      </div>
    </div>
  )
}