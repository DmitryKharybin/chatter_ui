import './UserPage.css'

export default function UpperCard({ user }) {




    return (

        <div className="upper_card">
            {user.image ? <img src={user.image} /> : <img src="./Images/DefaultAvatar.png" />}

            <h2>{user.name}</h2>
        </div>
    )
}