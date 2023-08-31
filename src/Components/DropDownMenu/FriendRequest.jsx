import VerticalContainer from "../VerticalContainer";
import HorizontalContainer from '../HorizontalContainer';

export default function FriendRequest({ request, onAccept, onDelete }) {



    return (
        <div className='horizontal-flex'>
            <div ><img src={'data:image/png;base64, ' + request.sender.image} alt="Profile picture of user" id="requester-image" /></div>
   
            <VerticalContainer>
                <div>{request.sender.name}</div>

                <HorizontalContainer>
                    <button onClick={() => onAccept(request)}>Add Friend</button>
                    <button onClick={() => onDelete(request)}>Remove</button>
                </HorizontalContainer>
            </VerticalContainer>

        </div>
    )
}