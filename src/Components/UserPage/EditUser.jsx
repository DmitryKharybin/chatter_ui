import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import * as yup from "yup";
import Form from "../Form/Form";
import useGetUserData from "../../hooks/useGetUserData";
import HorizontalContainer from "../HorizontalContainer";
import EndpointService from "../../Services/EndpointService";
import useHttpPostMutation from "../../hooks/useHttpPostMutation";

export default function EditUser() {

    const { isLoading, data, isError, error } = useGetUserData();
    const { user } = useContext(UserContext);
    const [userData, setUserData] = user;
    const endpointService = new EndpointService();
    const {mutate} = useHttpPostMutation();

    const key = localStorage.getItem('Key');

    const userUpdateEndpoint = endpointService.endpointStringFactory('data','UpdateUserData');

    const schema = yup.object({
        name: yup.string(),
        mail: yup.string().email(),
    })

    useEffect(() => {
        if (data) {
            setUserData(data.data)
        }
    }, [data])


    function onSubmitHandler(data) {
        for(let p in data){
            if(data[p] === '' || data[p] === null){
                delete data[p];
            }
        }
        const updatedUser = {...userData, ...data }
        mutate({ endPoint: userUpdateEndpoint, headers: { 'Authorization': 'Bearer ' + key}, body: updatedUser });

    }


    if (data) {


        const inputs = [
            {
                name: 'name',
                placeHolder: data.data?.name,
                type: 'text',
                id: 'name'
            },
            {
                name: 'mail',
                placeHolder: data.data.email,
                type: 'text',
                id: 'mail'
            }
        ]

        return (

            <HorizontalContainer>
                <div>
                <h2>Edit <i>{data?.data?.name}</i></h2>
                <Form schema={schema} inputs={inputs} submitHandler={onSubmitHandler} />
                </div>
            </HorizontalContainer>
        )
    }

    return null;

}