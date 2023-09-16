import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";


//onNewMessage & onNewNotification & onConnectionFail intended to be callback functions
export function useChatterHub(onNewMessage, onNewNotification, onConnectionFail, userData, loginState) {


    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const hubConnection = useRef(null);

    useEffect(() => {

        //If user is logged in , connect to hub
        if (loginState) {

            hubConnection.current = new HubConnectionBuilder()
                .withUrl("http://localhost:5078/ChatterHub")
                .build();


            const startConnection = async () => {
                try {

                    await hubConnection.current.start();
                    console.log("connection successful");
                    setIsConnected(true);

                } catch {
                    console.log("connection failed");
                    hubConnection.log('Connection closed, Retrying...');
                    setTimeout(() => {
                        onConnectionFail.start();
                    }, 5000)
                }
            }



            if (hubConnection.current != null) {


                //Invoke the onNewNotification callback function
                hubConnection.current.on("RequestUpdate", (message) => {
                    if (onNewNotification instanceof Function) {
                        onNewNotification(message);
                    }
                });

                //contain latest broadcast message
                hubConnection.current.on("broadcastMessage", (message) => {
                    setMessage(message);
                });

                //Invoke the onNewMessage callback function
                hubConnection.current.on("newMessage", (message) => {
                    if (onNewMessage instanceof Function) {
                        onNewMessage(message);
                    }
                });

                startConnection();

            }


            return () => {

                if (hubConnection.current && hubConnection.current.state === HubConnectionState.connected) {
                    hubConnection.current.stop();
                }
            }
        }




    }, [loginState])


    const chatFunctions = {
        //Login the hub & set isConnected to true
        login: async () => {

            if (hubConnection.current != null && hubConnection.current.state === 'Connected') {
                await hubConnection.current.send("Login", userData.id);
                console.log(`${userData.id} Active`);
                //setIsConnected(true);
                setIsLoggedIn(true);
            }

        
        },

        //Log out the user from hub
        logUserOut: async (username) => {
            if (hubConnection.current != null && hubConnection.current.state === 'Connected') {
                await hubConnection.current.send("Logout", username);
                console.log(`${username} Inactive`);
                setIsConnected(false);
            }
        },
    }


    return { message, isConnected, ...chatFunctions, isLoggedIn };
}