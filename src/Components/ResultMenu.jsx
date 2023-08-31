import { useContext } from "react";
import useHttpGet from "../hooks/useHttpGet"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App"


export default function ResultMenu({ input }) {

    const API = import.meta.env.VITE_BACKEND_CHATTER_API;
    const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_DATA_ENDPOINT;
    const key = localStorage.getItem('Key');
    const endpoint = `${API}/${DATA_ENDPOINT}/GetSearchResults`;

    const { user } = useContext(UserContext);

    const [userData, setUserData] = user;


    //If user input is empty , then the header wil be undefined , so i change it to '...'
    let userInput = input;

    if (!userInput) {
        userInput = '...';
    }


    //Use useHttpGet hook to get search result from api 
    const { isLoading, data, isError, error, refetch } = useHttpGet(endpoint, { 'Authorization': 'Bearer ' + key, 'str': userInput }, 'searchResult', input)

    const navigate = useNavigate()


    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                <p>Something went wrong</p>
            </div>
        )
    }



    if (data) {

        const searchRes = data.data;
        const userRes = searchRes.users;
        const groupRes = searchRes.groups;


        if (userRes.length == 0 && groupRes.length == 0) {
            return <p>Empty much :(</p>
        }

        return (
            <div className='vertical-flex'>
                <div className='horizontal-flex'>
                    {userRes.map((res, index) => {
                        return <div key={index} onClick={() => {
                            if (userData != undefined && res.name == userData.name) {
                                navigate('./profile')
                            } else {
                                navigate('/user/' + res.id)
                            }
                        }}>

                            <div ><img src={'data:image/png;base64, ' + res.image} alt="Profile picture of user" id="requester-image" /></div>
                            <div><i>User </i>{res.name}</div>

                        </div>
                    })}
                </div>

                <div>
                    {groupRes.map((res, index) => {
                        return <p key={index}> <i>Group </i>{res.description}</p>
                    })}
                </div>
            </div>

        )
    }
}