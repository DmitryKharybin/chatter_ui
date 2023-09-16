import VerticalContainer from "../VerticalContainer";
import MessengerSearchBar from "../SearchBar/MessengerSearchBar"
import HorizontalContainer from "../HorizontalContainer";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import './Messenger.css'
import useHttpGet from "../../hooks/useHttpGet";
import EndpointService from "../../Services/EndpointService";
import ExistingMessangerBox from "./ExistingChatBox";

export default function Messenger({ clicked }) {

    const { user, userCollection } = useContext(UserContext);
    const [userData, setUserData] = user;
    const [userInChatList, setUserInChatList] = userCollection;


    const endpintService = new EndpointService();

    const endpoint = endpintService.endpointStringFactory('data', 'GetChatParticipants');

    const key = localStorage.getItem('Key');

    const { data, isLoading, error } = useHttpGet(endpoint, { 'Authorization': 'Bearer ' + key }, 'chatParticipants');


    function openChat(participant) {

        if (!userInChatList.some(user => user.id === participant.id)) {
            setUserInChatList(users => {
                return [...users, participant]
            })
        }

    }



    if (data) {

        return (
            <div id="messenger-container">
                <VerticalContainer>
                    {clicked == false ? <div style={{ overflow: "auto" }}>
                        <MessengerSearchBar />
                        <VerticalContainer>
                            <div className="chats-area">
                                {data.data.map(user => {
                                    return <div key={user.id} onClick={() => openChat(user)}>
                                        <ExistingMessangerBox name={user.name} image={user.image} />
                                    </div>
                                })}
                            </div>
                        </VerticalContainer>
                    </div> : null}


                </VerticalContainer>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div id="messenger-container">
                <VerticalContainer>
                    {clicked == false ? <div style={{ overflow: "auto" }}>
                        <MessengerSearchBar />
                        <VerticalContainer>
                            <div className="chats-area">
                                Loading...
                            </div>
                        </VerticalContainer>
                    </div> : null}


                </VerticalContainer>
            </div>
        )
    }

}
