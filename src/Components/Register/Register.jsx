import { useNavigate } from "react-router-dom";
import useHttpPostMutation from "../../hooks/useHttpPostMutation";
import * as yup from 'yup';
import { useEffect } from "react";
import Form from "../Form/Form";
import EndpointService from "../../Services/EndpointService";

export default function Register() {

    const { mutate, isSuccess, isError, data, isLoading } = useHttpPostMutation()
    const navigate = useNavigate();

    const endpointService = new EndpointService();
    const registerEndpoint = endpointService.endpointStringFactory('user', 'RegisterUser');

    const schema = yup.object({
        name: yup.string().required('Name is required').min(4, 'Name must be at least 4 characters long')
            .max(20, "Name can't exceed 20 characters"),
        gender: yup.number().required('Gender is required').min(0).max(1),
        userName: yup.string().required('Username is required').min(4, 'Username must be at least 4 characters long')
            .max(20, "Username can't exceed 20 characters"),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long').max(30, "Password can't exceed 30 characters")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).*$/, 'Password must contain at least 1 : Capital letter, Regular letter, number, special symbol'),
        email: yup.string().required('Email is required').email('Please enter a valid email')
    })

    const inputs = [
        {
            name: 'name',
            placeHolder: 'Enter name',
            type: 'text',
            id: 'name'
        },
        {
            name: 'gender',
            type: 'select',
            id: 'gender',
            options: [{ name: 'male', value: 0 }, { name: 'female', value: 1 }]
        },
        {
            name: 'userName',
            placeHolder: 'Enter username',
            type: 'text',
            id: 'user_name'
        },
        {
            name: 'password',
            placeHolder: 'Enter password',
            type: 'password',
            id: 'pswrd'
        },
        {
            name: 'email',
            placeHolder: 'Enter email',
            type: 'text',
            id: 'email'
        }
    ]


    function onSubmitHandler(data) {
        mutate({ endPoint: registerEndpoint, body: data })
    }


    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem("Key", data.data);
            navigate("/login");
        }
    }, [isSuccess, data]);


    if (isError) {
        return (
            <div>
                <h1>Something went wrong</h1>
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
            <h2>Register Page</h2>
            <Form schema={schema} submitHandler={onSubmitHandler} inputs={inputs}></Form>
        </div>
    )

}