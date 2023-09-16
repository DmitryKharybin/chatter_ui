import { createContext, useState } from "react";
import { useChatterHub } from "./hooks/useChatterHub";



export const UserContext = createContext();

export function UserProvider(props) {

    const [loginState, setLoginState] = useState(false);
    const [userData, setUserData] = useState({});
    const [hasNotification, setHasNotification] = useState(false);
    //Pass in user name, id, image for chat 
    const [usersInChatList, setUsersInChatList] = useState([]);
    const chatterHub = useChatterHub(props.onNewMessage, props.onNewNotification, props.onFailConnection, props.userData, props.loginState);
    const [usersWithPendingMessage, setUsersWithPendingMessage] = useState([]);

    return (
        <UserContext.Provider value={{
            login: [loginState, setLoginState], user: [userData, setUserData],
            chatterHub: chatterHub, notification: [hasNotification, setHasNotification],
            userCollection: [usersInChatList, setUsersInChatList],
            messagesFromUsers: [usersWithPendingMessage, setUsersWithPendingMessage]
        }}>
            {props.children}
        </UserContext.Provider>
    )

}