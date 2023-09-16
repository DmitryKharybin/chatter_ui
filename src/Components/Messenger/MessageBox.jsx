/**
 * Get userId for chat , get data of chat from api , render it 
 * Manage chat , update query cache with new chat
 * 
 */

import VerticalContainer from "../VerticalContainer"
import HorizontalContainer from "../HorizontalContainer"
import { useEffect, useState } from "react"
import useHttpGet from "../../hooks/useHttpGet"
import useHttpPostMutation from "../../hooks/useHttpPostMutation"
import { useQueryClient } from "@tanstack/react-query"
import EndpointService from "../../Services/EndpointService"
import { useContext } from "react"
import { UserContext } from "../../App"


export default function MessageBox({ userId, secondParticipant }) {

    const [message, setMessage] = useState('');
    const queryClient = useQueryClient();
    const endpointService = new EndpointService();
    const getChatEndpoint = endpointService.endpointStringFactory('data', 'GetUserChat');
    const sendMessageEndpoint = endpointService.endpointStringFactory('data', 'SendMessage');
    const markReadEndPoint = endpointService.endpointStringFactory('data', 'MarkMessageAsRead');

    const key = localStorage.getItem('Key');




    const { messagesFromUsers, userCollection } = useContext(UserContext);
    const [usersInChatList, setUsersInChatList] = userCollection;
    const [usersWithPandingMessages, setUsersWithPandingMessages] = messagesFromUsers
    const { isLoading, data, isError, error } = useHttpGet(getChatEndpoint, { 'Authorization': 'Bearer ' + key, secondParticipantId: secondParticipant.id }, 'chat', secondParticipant.id);
    const { mutate } = useHttpPostMutation();
    const [chatIsOpen, setChatIsOpen] = useState(true);



    function sendMessage(text) {

        setMessage('');

        const newMessage = { id: getRandomId(), senderId: userId, receiverId: secondParticipant.id, body: text, isRead: false, date: new Date() }
        mutate({ endPoint: sendMessageEndpoint, headers: { 'Authorization': 'Bearer ' + key }, body: newMessage });

        const chatQuery = queryClient.getQueryData(['chat', secondParticipant.id]);

        if (chatQuery.data?.length == 0) {
            addParticipantToList({ id: secondParticipant.id, name: secondParticipant.name, image: secondParticipant.image });
        }

        queryClient.setQueryData(['chat', secondParticipant.id], (data) => {
            return {
                data:
                    [...data.data, newMessage]
            }
        })
        queryClient.setQueryData(['MyUserData'], (data) => {
            return {
                data: {
                    ...data?.data,
                    sentMessages: [...data?.data?.sentMessages, newMessage]
                }
            };
        });
    }

    function addParticipantToList(participant) {
        queryClient.setQueryData(['chatParticipants'], (data) => {
            return {
                data:
                    [...data.data, participant]

            }
        })
    }

    function getRandomId() {
        const randomId = crypto.randomUUID();
        return randomId;
    }


    //Clear the sender from the pending messages list & set all messages in chat to read = true
    function removeUserFromPendingMessages(userId) {

        // if (!usersWithPandingMessages.some(user => user.id == userId)) {
        //     return;
        // }

        // setUsersWithPandingMessages(users => {
        //     return users?.filter(user => user.id != userId)
        // });

        const userData = queryClient.getQueryData(['MyUserData']);

        const messagesIdArr = userData?.data.receivedMessages?.filter(message => message?.senderId == userId).map(message => {
            return message.id
        })


        //TODO: check mutation from api
        mutate({ endPoint: markReadEndPoint, headers: { 'Authorization': 'Bearer ' + key }, body: messagesIdArr });

        queryClient.setQueryData(['MyUserData'], data => {
            return {
                data: {
                    ...data?.data,
                    receivedMessages: data.data?.receivedMessages?.map(message => {
                        if (message?.senderId == userId) {
                            return { ...message, isRead: true };
                        }
                    })
                }
            };
        });
    }


    useEffect(() => {
        if (chatIsOpen == true) {
            removeUserFromPendingMessages(secondParticipant.id);
        }
    }, [chatIsOpen])

    function toggleChat() {
        setChatIsOpen(open => {
            return !open;
        });
    };

    function closeChat(user) {
        setUsersInChatList(users => {
            return users.filter(u => u.id != user.id)
        })
    }


    if (data) {

        if (!chatIsOpen) {

            return (

                <img className="dock-image" src={'data:image/png;base64, ' + secondParticipant.image} onClick={() => toggleChat()} />

            )
        }

        else {
            return (

                <div className="border-wrapper">
                    <VerticalContainer gapDist={0}>
                        <div id="chat-box-dock">
                            <HorizontalContainer xAxis='space-between'>

                                <HorizontalContainer>
                                    <img className="dock-image" src={'data:image/png;base64, ' + secondParticipant.image} />
                                    <p>{secondParticipant.name}</p>
                                </HorizontalContainer>




                                <HorizontalContainer>
                                    <button onClick={() => toggleChat()}>minimize</button>
                                    <button onClick={() => closeChat(secondParticipant)}>Close</button>
                                </HorizontalContainer>

                            </HorizontalContainer>
                        </div>

                        {chatIsOpen == true ?
                            <div id="chat-box-container" className="scrollable">
                                <hr></hr>
                                {data.data?.map(message => {
                                    const messageDate = new Date(message.date)
                                    return <div key={message.id}>

                                        <HorizontalContainer xAxis={message.senderId == userId ? 'end' : 'start'}>

                                            <div className={message.senderId == userId ? 'my-message chat-bubble chat-spacing' : 'other-user-message chat-bubble chat-spacing'}>{message.body}

                                                <i id="message-date">{messageDate.getHours()}:{messageDate.getMinutes()}</i>
                                            </div>


                                        </HorizontalContainer>

                                    </div>
                                })}
                            </div> : null}

                        <HorizontalContainer gapDist='2px'>

                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What do you have in mind?" className="text-area" />
                            <button disabled={message.length == 0 ? true : false} className="imbedded-btn" onClick={() => sendMessage(message)}>send</button>
                        </HorizontalContainer>



                    </VerticalContainer>
                </div>
            )
        }
    }

}