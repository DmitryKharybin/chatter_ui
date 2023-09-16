import { useParams } from "react-router-dom";
import useHttpGet from '../../hooks/useHttpGet';
import UpperCard from "./UpperCard";
import Feed from "./Feed";
import useHttpPostMutation from "../../hooks/useHttpPostMutation";
import { useContext } from "react";
import { UserContext } from "../../App";
import useGetUserData from '../../hooks/useGetUserData';
import { useEffect } from "react";
import HorizontalContainer from "../HorizontalContainer";
import VerticalContainer from "../VerticalContainer";
import EndpointService from "../../Services/EndpointService";


export default function UserPage() {

    const params = useParams();

    const { user, userCollection } = useContext(UserContext);
    const [userData, setUserData] = user;
    const [usersInChatList, setUsersInChatList] = userCollection;
    const getUserQuery = useGetUserData();

    const endpointService = new EndpointService();


    const { chatterHub } = useContext(UserContext);

    const { requestChanged } = chatterHub;


    const endpoint = endpointService.endpointStringFactory('data', 'GetUserData');
    const friendRequestEndpoint = endpointService.endpointStringFactory('data', 'SendFriendRequest');


    

    const key = localStorage.getItem('Key');

    const { isLoading, data, isError, error } = useHttpGet(endpoint, { 'Authorization': 'Bearer ' + key, userId: params.id }, 'UserData', params.id);
    const { mutate } = useHttpPostMutation()


    useEffect(() => {
        if (getUserQuery.data) {
            setUserData(getUserQuery.data.data);
        }
    }, [getUserQuery.data])

    function setUserChat(userId, userName, userImage) {
        if (!usersInChatList.some(user => user.id == userId)) {
            setUsersInChatList(users => [...users, { id: userId, name: userName, image: userImage }]);
        }
    }


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
            <VerticalContainer>

                <UpperCard user={{ image: user?.image, name: user?.name, friends: user?.friends }} >
                    {user.image ? <img src={'data:image/png;base64, ' + user.image} /> : <img src="/Images/DefaultAvatar.png" />}

                    <div className='user_brief'>
                        <h2>{user.name}</h2>
                        {user.friends ? <p>{user.friends.length} friends</p> : <p>No Friends... yet</p>}
                    </div>

                    <HorizontalContainer>
                        <button onClick={() => sendFriendRequest()}>Friends request</button>
                        <button onClick={() => setUserChat(user.id, user.name, user.image)}>Message</button>
                    </HorizontalContainer>
                </UpperCard >
                <Feed posts={user.posts} />
            </VerticalContainer>
        )
    }



}