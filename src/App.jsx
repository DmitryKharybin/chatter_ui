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
// import useHttpGet from "../src/hooks/useHttpGet";
import useGetUserData from '../src/hooks/useGetUserData'
export const UserContext = createContext();


function App() {


  const [loginState, setLoginState] = useState();
  const [userData, setUserData] = useState({});
  const queryClient = useQueryClient();
  const chatterHub = useChatterHub(onNewMessage, onNewNotification, onFailConnection, userData);
  const [hasNotification, setHasNotification] = useState(false);


  const dataService = new DataService();
  //const key = localStorage.getItem('Key');


  // const API = import.meta.env.VITE_BACKEND_CHATTER_API;
  // const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_DATA_ENDPOINT;



  // const endpoint = `${API}/${DATA_ENDPOINT}/GetMyUserData`;

  //const { data } = useHttpGet(endpoint, { Authorization: key }, 'MyUserData')

  //const {data} = useGetUserData();

  // useEffect(() => {
  //   if (data != undefined) {
  //     setUserData(data.data);
  //   }
  // }, [data]);

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
        const newMessageData = req.data;
        queryClient.setQueriesData(['MyUserData'], (data) => {
          return {
            data: {
              ...data.data,
              friendRequests: newMessageData
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

  function onNewMessage() {
    //TODO : complete new message logic
  }

  function onFailConnection() {
    alert('Disconnected from server, Please refresh page');
  }





  useEffect(() => {
    if (localStorage.getItem('Key')) {
      setLoginState(true);
      // console.log(userData);
      // logUser(userData);
    } else {
      setLoginState(false);
    }
  }, [])

//Attempt to login user
  function logUser(userData) {
    const interval = setInterval(() => {
      if (!chatterHub.isLoggedIn && userData.id != undefined) {
        chatterHub.login();
        clearInterval(interval);
      }
    }, 1000);
  }


  useEffect(() => {
    logUser(userData);
  }, [userData])


  return (
    <UserContext.Provider value={{
      login: [loginState, setLoginState], user: [userData, setUserData],
      chatterHub: chatterHub, notification: [hasNotification, setHasNotification]
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
          <Route path='*' element={loginState ? <HomePage /> : <LoginPage />} />
        </Routes>
      </div>

      <footer id="footer">
        <p>©Copyright 2023 Chatter. All rights reversed.</p>
      </footer>
    </UserContext.Provider>
  )
}

export default App
