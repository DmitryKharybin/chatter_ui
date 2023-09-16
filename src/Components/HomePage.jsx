import { Link } from "react-router-dom";
import useHttpGet from '../hooks/useHttpGet'
import './HomePage.css'
import useGetUserData from '../hooks/useGetUserData';

export default function () {


    const API = import.meta.env.VITE_BACKEND_CHATTER_API;
    const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_DATA_ENDPOINT;

    const endpoint = `${API}/${DATA_ENDPOINT}/GetMyUserData`;

    const key = localStorage.getItem('Key');

    //const { isLoading, data, isError } = useHttpGet(endpoint, { Authorization: key }, 'MyUserData')

    const { isLoading, data, isError, error } = useGetUserData();



    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }


    if (isError) {
        return (
            <div>
                <h1>Something went wrong, Please <Link to={'/login'}>log in again</Link></h1>

            </div>

        )
    }


    if (data) {
        const user = data.data
        return (
            <div>
                <h2></h2>
                <div className="comment_slider">

                    {user.friends.map(friend => {
                        return friend?.posts?.map(post => {
                            return <div key={post.id} className="post_card">
                                <img src='data:image/png;base64,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' />
                                <div>
                                    <p>{post.description}</p>
                                </div>
                            </div>
                        })
                    })}

                </div>
            </div>
        )
    }
}