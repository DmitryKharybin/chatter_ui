import UpperCard from "./UpperCard";
import useHttpGet from "../../hooks/useHttpGet";
import Feed from "./Feed";

export default function UserPage() {


    const API = import.meta.env.VITE_BACKEND_CHATTER_API;
    const DATA_ENDPOINT = import.meta.env.VITE_BACKEND_DATA_ENDPOINT;

    const endpoint = `${API}/${DATA_ENDPOINT}/GetMyUserData`;

    const key = localStorage.getItem('Key');

    const { isLoading, data, isError, error } = useHttpGet(endpoint, { Authorization: key })



    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }


    if (isError) {


        return (
            <h1>Something went wrong </h1>
        )
    }


    if (data) {
        const user = data.data
        return (
            <div className="vartical_flex_container">

                <UpperCard user={{ image: user?.image, name: user?.name, friends: user?.friends }} />

                <Feed posts={user.posts} />
            </div>
        )
    }


}
