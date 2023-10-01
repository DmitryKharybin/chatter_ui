import { Routes, Route } from "react-router-dom";
import "./App.css"
import NavBar from "./Components/NavBar/NavBar";
import MyUserPage from "./Components/UserPage/MyUserPage";
import UserPage from "./Components/UserPage/UserPage";
import LoginPage from "./Components/Login/LoginPage";
import HomePage from "./Components/HomePage";
import Register from "./Components/Register/Register";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useChatterHub } from "./hooks/useChatterHub";
import DataService from "./Services/DataService";
import MessengerDock from "./Components/Messenger/MessengerDock";
import MessagePanel from "./Components/Messenger/MessagePanel";
import EditUser from "./Components/UserPage/EditUser";
export const UserContext = createContext();


function App() {


  const [loginState, setLoginState] = useState(false);
  const [userData, setUserData] = useState({});
  const queryClient = useQueryClient();
  const chatterHub = useChatterHub(onNewMessage, onNewNotification, onFailConnection, userData, loginState);
  const [hasNotification, setHasNotification] = useState(false);
  //Pass in user name, id, image for chat 
  const [usersInChatList, setUsersInChatList] = useState([]);
  const [usersWithPendingMessage, setUsersWithPendingMessage] = useState([]);


  const dataService = new DataService();


  function logout() {
    localStorage.removeItem('Key');
    setLoginState(false);
    queryClient.removeQueries({ queryKey: 'MyUserData', exact: true });
    chatterHub.logUserOut(userData.id);
  }



  async function onNewNotification(message) {
    const key = localStorage.getItem('Key');

    switch (message) {

      case 'FriendRequestDeleted':
        await updatefriendRequests(key);
        break;

      case 'NewFriendRequest':

        await updatefriendRequests(key);
        setHasNotification(true);
        break;
      case 'FriendRequestAccepted':

        await updateFriendList(key);
        await updatefriendRequests(key);
        break;

      default:
        break;
    }
  };

  async function updatefriendRequests(key) {
    dataService.getFriendRequests(key)
      .then(req => {
        const newFriendsData = req.data;
        queryClient.setQueriesData(['MyUserData'], (data) => {
          return {
            data: {
              ...data.data,
              friendRequests: newFriendsData
            }
          };
        });
      });
  }
  async function updateFriendList(key) {
    dataService.getFriendList(key)
      .then(req => {
        const newFriendsData = req.data;
        queryClient.setQueryData(['MyUserData'], (data) => {
          return {
            data: {
              ...data.data,
              friends: newFriendsData
            }
          };
        });
      });
  }

  function onNewMessage(message) {

    setHasNotification(true);
    //If user already exist in array , override latest message
    setUsersWithPendingMessage(users => {
      if (!usersWithPendingMessage.some(u => u.id == message.senderId)) {
        return [...users, { id: message.senderId, Image: message.sender.image, name: message.sender.name, message: message.body }]
      }
    })


    queryClient.setQueryData(['chatParticipants'], (data) => {
      if (data.data.some(u => u.id == message.senderId)) {
        return;
      }
      return {
        data:
          [...data.data, message.sender]
      }
    });
    queryClient.setQueryData(['MyUserData'], (data) => {
      return {
        data: {
          ...data?.data,
          receivedMessages: [...data?.data?.receivedMessages, message]
        }
      };
    });


    queryClient.setQueryData(['chat', message.senderId], (data) => {
      return {
        data:
          [...data?.data, message]
      }
    });

  }


  function onFailConnection() {
    alert('Disconnected from server, Please refresh page');
  }


  useEffect(() => {
    if (localStorage.getItem('Key')) {
      setLoginState(true);

    } else {
      setLoginState(false);
    }
  }, [])




  //Attempt to login user
  function logUser(userData) {


    chatterHub.login();
    const interval = setInterval(() => {
      if (!chatterHub.isLoggedIn && userData.id != undefined) {
        chatterHub.login();
        clearInterval(interval);
      }
    }, 1000);
  }


  useEffect(() => {
    if (loginState == true) {
      logUser(userData);
    }


    let tempUsersArr = []

    userData?.receivedMessages?.forEach(message => {

      if (!message?.isRead) {

        if (!tempUsersArr.some(u => u?.id == message?.senderId)) {
          tempUsersArr.push({ id: message?.senderId, image: message?.sender?.image, name: message?.sender?.name, message: message?.body });
        }
      }
    });

    setUsersWithPendingMessage(tempUsersArr);


    if (userData.receivedMessages?.length > 0) {

      if (userData.receivedMessages.some(message => message.isRead == false)) {
        setHasNotification(true);
      }
    }


  }, [userData])




  return (
    <UserContext.Provider value={{
      login: [loginState, setLoginState], user: [userData, setUserData],
      chatterHub: chatterHub, notification: [hasNotification, setHasNotification],
      userCollection: [usersInChatList, setUsersInChatList],
      messagesFromUsers: [usersWithPendingMessage, setUsersWithPendingMessage]
    }}>


      <div>
        <NavBar logout={logout}>

        </NavBar>
      </div>

      <div className='container'>
        <Routes>
          <Route path='home' element={<HomePage />} />
          <Route path='profile' element={<MyUserPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<Register />} />
          <Route path='user/:id' element={<UserPage />} />
          <Route path='editUser' element={<EditUser />} />
          <Route path='*' element={loginState ? <HomePage /> : <LoginPage />} />
        </Routes>

        {loginState ? <div className="chat-box">
          <MessengerDock></MessengerDock>
        </div> : null}

        {loginState ? <div className="chat-container"><MessagePanel /></div> : null}


      </div>

    </UserContext.Provider>
  )
}

export default App
