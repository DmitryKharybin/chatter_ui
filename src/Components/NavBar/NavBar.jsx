import { Link, NavLink } from "react-router-dom";
import './NavBar.css';
import SearchBar from "../SearchBar/SearchBar";
import { UserContext } from "../../App"
import { useContext, useEffect } from "react";
import { ReactComponent as GroupIcon } from '../../../src/icons/group.svg'
import { ReactComponent as LogoutIcon } from '../../../src/icons/logout.svg'
import { ReactComponent as BellLogo } from '../../../src/icons/bell.svg'
import NavItem from './NavItem';
import DropDownMenu from '../DropDownMenu/DropDownMenu'
import '../DropDownMenu/DropDownMenu.css'
import DropDownItem from "../DropDownMenu/DropDownItem";
import FriendRequest from "../DropDownMenu/FriendRequest";
import "../../App.css"
import useHttpPostMutation from "../../hooks/useHttpPostMutation";
import VerticalContainer from "../VerticalContainer";
import EndpointService from "../../Services/EndpointService";
import { useQueryClient } from "@tanstack/react-query";
import HorizontalContainer from "../HorizontalContainer";




export default function NavBar({ logout }) {

    //Context from App component
    const { login, user, notification, messagesFromUsers, userCollection } = useContext(UserContext);
    const [loginState, setLoginState] = login;
    const [userData, setUserData] = user;
    const [hasNotification, setHasNotification] = notification;
    const [usersWithPandingMessages, setUsersWithPandingMessages] = messagesFromUsers
    const [usersInChatList, setUserInChatList] = userCollection;
    const endpointService = new EndpointService();
    const queryClient = useQueryClient();


    const { mutate } = useHttpPostMutation();




    //Endpoint for remove/accept friend requests
    const acceptRequestEndPoint = endpointService.endpointStringFactory('data', 'AcceptFriendRequest');
    const removeRequestEndPoint = endpointService.endpointStringFactory('data', 'DeleteFriendRequest');



    function acceptFriendRequest(request) {
        const key = localStorage.getItem('Key');
        mutate({ endPoint: acceptRequestEndPoint, headers: { 'Authorization': 'Bearer ' + key }, body: request });
    }


    function removeFriendRequest(request) {
        const key = localStorage.getItem('Key');
        mutate({ endPoint: removeRequestEndPoint, headers: { 'Authorization': 'Bearer ' + key }, body: request });
    }

    function notificationBarOpened() {

        setHasNotification(false);
    }

    function openChat(participant){
         if (!usersInChatList.some(user => user.id === participant.id)) {
            setUserInChatList(users => {
                return [...users, participant]
            })
        }

        setUsersWithPandingMessages(users => users.filter(user =>{
            return user.id != participant.id;
        }))
    }

   

    if (loginState) {


        return (

            <nav className="navbar">

                <div className="search_container">
                    <Link to={'/'} className="navbar_logo">Chatter</Link>

                    <SearchBar></SearchBar>

                </div>

                <ul>

                    <NavItem destination={'/profile'} icon={userData === null || userData.image == undefined ? <img src="/Images/DefaultAvatar.png" /> : <img src={'data:image/png;base64, ' + userData.image} />} />
                    {hasNotification ? <div className="notification"></div> : null}
                    <NavItem specialFunc={notificationBarOpened} icon={<BellLogo />}>

                        <DropDownMenu>
                            <VerticalContainer>

                                <DropDownItem>
                                    {usersWithPandingMessages?.map(user => {
                                        return <div key={user.id} onClick={() => openChat(user)}>
                                            <HorizontalContainer>
                                            <h3>Message From:</h3>
                                            <i>{user.name}</i>
                                            </HorizontalContainer>
                                            
                                        </div>
                                    })}
                                    {userData?.friendRequests?.map(request => {
                                        return <div key={request.id}>
                                            <FriendRequest onAccept={acceptFriendRequest} onDelete={removeFriendRequest} request={request} ></FriendRequest>
                                        </div>
                                    })}
                                </DropDownItem>
                            </VerticalContainer>

                        </DropDownMenu>

                    </NavItem>
                    <NavItem destination={'/groups'} icon={<GroupIcon />} />
                    <NavItem action={logout} destination={'/login'} icon={<LogoutIcon />} />
                </ul>
            </nav>


        )
    }

    return (

        <nav className="navbar">

            <div className="search_container">
                <h1>Chatter</h1>
            </div>

            <ul>
                <li><NavLink to={'/login'} className={({ isActive }) => isActive ? 'active_link' : 'inactive_link'}>Login</NavLink></li>
            </ul>
        </nav>


    )
}