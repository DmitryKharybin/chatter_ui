import { useContext } from "react";
import HorizontalContainer from "../HorizontalContainer";
import MessageBox from "./MessageBox";
import { UserContext } from "../../App";


export default function MessagePanel() {

    const { user, userCollection } = useContext(UserContext);
    const [usersInChatList] = userCollection;
    const [userData] = user;



    if (usersInChatList) {


        return (
            <div className="scrollable-x">
                <HorizontalContainer yAxis='end'>
                    {usersInChatList.map((user, index) => {
                        return <div key={index}><MessageBox userId={userData.id} secondParticipant={user} /></div>
                    })}
                </HorizontalContainer>
            </div>
        )
    }

    else {
        return (
            null
        )
    }
}