import { useContext, useState } from "react";
import HorizontalContainer from "../HorizontalContainer";
import VerticalContainer from "../VerticalContainer";
import Messenger from "./Messenger";
import { UserContext } from "../../App";
import { ReactComponent as MessengerIcon } from "../../icons/Messenger.svg"
import { ReactComponent as OpenIcon } from "../../icons/open.svg"
import { ReactComponent as CloseIcon } from "../../icons/close.svg"
import useOutsideAlert from "../../hooks/useOutsideAlerter";

export default function MessengerDock() {

    const [clicked, setClicked] = useState(false);

    const { userCollection } = useContext(UserContext);

    const [outSideDetect, setoutSideDetect, ref] = useOutsideAlert(true);




    return (

        <div id="messenger-dock" ref={ref}>
            <VerticalContainer>
                <div id="message-dock-top">
                    <HorizontalContainer xAxis='space-between'>
                        <div onClick={() => setoutSideDetect(false)}>
                            <HorizontalContainer>
                                <MessengerIcon />
                                <p>Messaging</p>
                            </HorizontalContainer>
                        </div>

                        <button onClick={() => setoutSideDetect(currentStatus => !currentStatus)} >{outSideDetect == false ? <CloseIcon /> : <OpenIcon />}</button>

                    </HorizontalContainer>
                </div>
                <div>
                    <Messenger clicked={outSideDetect}></Messenger>
                </div>


            </VerticalContainer>
        </div>

    )
}