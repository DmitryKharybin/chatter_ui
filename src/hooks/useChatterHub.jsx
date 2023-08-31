import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";


//onNewMessage & onNewNotification & onConnectionFail intended to be callback functions
export function useChatterHub(onNewMessage, onNewNotification, onConnectionFail, userData) {


    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const hubConnection = useRef(null);


    useEffect(() => {


        hubConnection.current = new HubConnectionBuilder()
            .withUrl("http://localhost:5078/ChatterHub")
            .build();


        const startConnection = async () => {
            try {

                await hubConnection.current.start();
                console.log("connection successful");
                //console.log(userData.id);

                // await hubConnection.current.send("Login", userData.id);
                // console.log(`${id} Active`);
                setIsConnected(true);
                //setIsConnected(true);

            } catch {
                console.log("connection failed");

                if (onConnectionFail instanceof Function) {
                    onConnectionFail();
                }
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
            hubConnection.current.on("newMessage", () => {
                if (onNewMessage instanceof Function) {
                    onNewMessage();
                }
            });

            startConnection();

        }


        return () => {

            if (hubConnection.current && hubConnection.current.state === HubConnectionState.connected) {
                hubConnection.current.stop();
            }
        }



    }, [])


    const chatFunctions = {
        //Login the hub & set isConnected to true
        login: async () => {

            if (hubConnection.current != null && hubConnection.current.state === 'Connected') {
                await hubConnection.current.send("Login", userData.id);
                console.log(`${userData.id} Active`);
                //setIsConnected(true);
                setIsLoggedIn(true);
            }

            // await hubConnection.current.send("Login", userData.id);
            // console.log(`${id} Active`);
            // setIsConnected(true);
        },

        //Log out the user from hub
        logUserOut: async (username) => {
            if (hubConnection.current != null && hubConnection.current.state === 'Connected') {
                await hubConnection.current.send("Logout", username);
                console.log(`${username} Inactive`);
                setIsConnected(false);
            }
        },

        //Send the hub a message that a friend request was sent (including target username)
        requestChanged: async (targetId) => {
            if (hubConnection.current != null && hubConnection.current.state === 'Connected') {
                // await hubConnection.current.send("SendRequest", targetId);
                // console.log("request sent");
            }
        }
    }


    // return { message, isConnected, login, logUserOut, requestChanged };
    return { message, isConnected, ...chatFunctions, isLoggedIn };
}