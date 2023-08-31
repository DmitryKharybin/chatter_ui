import VerticalContainer from "../VerticalContainer";
import MessengerSearchBar from "../SearchBar/MessengerSearchBar"
import HorizontalContainer from "../HorizontalContainer";
import { useContext } from "react";
import { UserContext } from "../../App";

export default function Messenger() {

    const { user } = useContext(UserContext);
    const [userData, setUserData] = user;


    return (
        <div>
            <VerticalContainer>
                <HorizontalContainer>
                    <div>
                        <img></img>
                        <p>Messaging</p>
                    </div>

                    <div>
                        <button>Close</button>
                    </div>

                </HorizontalContainer>
                <MessengerSearchBar />
                <div style={{ overflow: "auto" }}>
                    <VerticalContainer>
                    //TODO: add messages
                    </VerticalContainer>
                </div>


            </VerticalContainer>
        </div>
    )
}