import UpperCard from "./UpperCard";
// import useHttpGet from "../../hooks/useHttpGet";
import useGetUserData from "../../hooks/useGetUserData";
import Feed from "./Feed";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";



export default function MyUserPage() {

    const { user, chatterHub } = useContext(UserContext);
    const [userData, setUserData] = user;
    const { message, isConnected, login, logUserOut, requestChanged } = chatterHub;

    // const API = import.meta.env.VITE_BACKEND_CHATTER_API;
    // const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_DATA_ENDPOINT;



    // const endpoint = `${API}/${DATA_ENDPOINT}/GetMyUserData`;

    // const key = localStorage.getItem('Key');


    // const { isLoading, data, isError, error } = useHttpGet(endpoint, { Authorization: key }, 'MyUserData')

    const { isLoading, data, isError, error } = useGetUserData();
    

    useEffect(() => {
        if (data) {
            setUserData(data.data);
        }
    }, [data])



    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }
    


    if (isError) {


        return (
            <h1>Something went wrong, Please <Link to={'/login'}>log in again</Link></h1>
        )
    }


    if (data) {
        const user = data.data;
        return (
            <div className="vartical_flex_container">

                <UpperCard>
                    <img src={'data:image/png;base64, ' + user.image} alt="Profile image" />

                    <div className='user_brief'>
                        <h2>{user.name}</h2>
                        {user.friends ? <p>{user.friends.length} friends</p> : <p>No Friends... yet</p>}
                    </div>

                    <div className='flex_wrapper'>
                        <button>New post</button>
                        <button>Edit profile</button>
                    </div>
                </UpperCard >

                <Feed posts={user.posts} />

            </div>

        )
    }


}
