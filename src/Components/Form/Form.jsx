import { useForm } from "react-hook-form";
import Input from "./Input";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    userName: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
})

export default function Form({ submitHandler }) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });



    const onSubmit = (data) => {
        submitHandler(data)
    }


    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <Input
                register={register}
                inputName='userName'
                inputPlaceHolder='Enter User Name'
                inputType='text'
                inputId='user_name'
            />
            <p>{errors.userName?.message}</p>

            <Input
                register={register}
                inputName='password'
                inputPlaceHolder='Enter Password'
                inputType='password'
                inputId='pswrd'
            />
            <p>{errors.password?.message}</p>


            <button>Login</button>

        </form>

    )
}