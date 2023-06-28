import { useState } from "react";
import UpperCard from "./UpperCard";
import UserService from '/src/Services/UserService'

export default function UserPage() {

    const [user, setUser] = useState({ name: 'John', gender: 'Male', image: './Images/DefaultAvatar.png' })

    const userService = new UserService();

    function getUserData(){
        const token = localStorage.getItem('Key')
        userService.getUserData(token)
        .then(response => console.log(response.data))

    }

    return (
        <>
            <UpperCard user={user} />
        </>
    )
}