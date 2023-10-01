import UpperCard from "./UpperCard";
import useGetUserData from "../../hooks/useGetUserData";
import Feed from "./Feed";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import { ReactComponent as ImageLogo } from '../../icons/image.svg';
import '../../App.css'
import Input from "../Form/Input";
import useHttpPostMutation from "../../hooks/useHttpPostMutation";
import EndpointService from "../../Services/EndpointService";
import { useQueryClient } from "@tanstack/react-query";



export default function MyUserPage() {

    const { user, chatterHub, login } = useContext(UserContext);
    const [userData, setUserData] = user;
    const { message, isConnected, logUserOut, requestChanged } = chatterHub;
    const [loginState, setLoginState] = login;
    const navigate = useNavigate();
    const fileUploadRef = useRef(null);
    const [imageUploadIsOpen, setImageUploadIsOpen] = useState(false);
    const  imageMutation  = useHttpPostMutation();

    const { isLoading, data, isError, error } = useGetUserData();

    const endpointService = new EndpointService();
    const queryClient = useQueryClient();

    const imageUpdateEndpoint = endpointService.endpointStringFactory('data', 'UpdateUserImage');
    const key = localStorage.getItem('Key');


    useEffect(() => {
        if (data) {
            setUserData(data.data);
        }
    }, [data])

    function triggerFileInput() {
        fileUploadRef.current.click();
    }

    function checkFileFormat(extension){
        const formats = ['jpg','jpeg','png'];

        return formats.includes(extension);
    }

    function uploadFile(event) {
        const fd = new FormData();
        const newFile = event.target.files[0];
        const fileExtension = newFile.name.split('.')[1];
        if(!checkFileFormat(fileExtension)){
            alert('Please select a valid image')
            return;
        }
        fd.append('newImage', newFile);
        imageMutation.mutate({ endPoint: imageUpdateEndpoint, headers: { 'Authorization': 'Bearer ' + key}, body: fd });
    }

    //In case Image uploaded successfully, mutate user cache, update image
    if(imageMutation.data){
        queryClient.setQueryData(['MyUserData'], (data) => {
            return {
                data:{
                    ...data.data,
                    image: imageMutation.data.data
                }
               
            }
        })
    }


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }


    if (isError) {

        return (
            <h1>Something went wrong, Please <Link to={'/login'}>log in again</Link></h1>
        )
    }


    if (data) {
        const user = data.data;
        return (
            <div className="vartical_flex_container">

                <UpperCard>
                    <div>
                        <img src={'data:image/png;base64, ' + user.image} alt="Profile image" />
                        <div style={{ display: 'inline', position: 'relative', bottom: 5, right: 75 }} className="tiny-image" onClick={triggerFileInput}>

                            <div style={{ display: 'none' }}>
                                <Input inputType='file' inputName='fileUpload' inputId='fileUpload' inputRef={fileUploadRef} whenChange={uploadFile} />
                            </div>

                            <ImageLogo />
                        </div>
                    </div>

                    <div className='user_brief'>
                        <h2>{user.name}</h2>
                        {user.friends ? <p>{user.friends.length} friends</p> : <p>No Friends... yet</p>}
                    </div>

                    <div className='flex_wrapper'>
                        <button>New post</button>
                        <button onClick={() => navigate('/editUser')}>Edit profile</button>
                    </div>
                </UpperCard >

                <Feed posts={user.posts} />

            </div>

        )
    }


}
