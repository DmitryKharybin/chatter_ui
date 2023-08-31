import { useParams } from "react-router-dom";
import useHttpGet from '../../hooks/useHttpGet';
import UpperCard from "./UpperCard";
import Feed from "./Feed";
import useHttpPostMutation from "../../hooks/useHttpPostMutation";
import { useContext } from "react";
import { UserContext } from "../../App";
import useGetUserData from '../../hooks/useGetUserData';
import { useEffect } from "react";


export default function UserPage() {

    const params = useParams();

    const { user } = useContext(UserContext);
    const [userData, setUserData] = user;

    const getUserQuery = useGetUserData();


    const { chatterHub } = useContext(UserContext);

    const { requestChanged } = chatterHub;

    const API = import.meta.env.VITE_BACKEND_CHATTER_API;
    const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_DATA_ENDPOINT;


    const endpoint = `${API}/${DATA_ENDPOINT}/GetUserData`;

    const friendRequestEndpoint = `${API}/${DATA_ENDPOINT}/SendFriendRequest`;

    const key = localStorage.getItem('Key');

    const { isLoading, data, isError, error } = useHttpGet(endpoint, { 'Authorization': 'Bearer ' + key, userId: params.id }, 'UserData', params.id);
    const { mutate } = useHttpPostMutation()


    useEffect(() => {
        if (getUserQuery.data) {
            setUserData(getUserQuery.data.data);
        }
    }, [getUserQuery.data])



    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }


    if (isError) {


        return (
            <h1>Something went wrong</h1>
        )
    }


    function sendFriendRequest() {
        mutate({ endPoint: friendRequestEndpoint, headers: { 'Authorization': 'Bearer ' + key, 'targetUserId': data.data.id } });
        requestChanged(data.data.id);
    }


    if (data) {



        const user = data.data

        return (
            <div className="vartical_flex_container">

                <UpperCard user={{ image: user?.image, name: user?.name, friends: user?.friends }} >
                    {user.image ? <img src={'data:image/png;base64, ' + user.image} /> : <img src="/Images/DefaultAvatar.png" />}

                    <div className='user_brief'>
                        <h2>{user.name}</h2>
                        {user.friends ? <p>{user.friends.length} friends</p> : <p>No Friends... yet</p>}
                    </div>

                    <div className='flex_wrapper'>
                        <button onClick={() => sendFriendRequest()}>Friends request</button>
                        <button>Message</button>
                    </div>
                </UpperCard >
                <Feed posts={user.posts} />
            </div>
        )
    }



}