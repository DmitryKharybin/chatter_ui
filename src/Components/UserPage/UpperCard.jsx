import './UserPage.css'

export default function UpperCard({ user }) {




    return (

        <div className="upper_card">
            {user.image ? <img src={user.image} /> : <img src="./Images/DefaultAvatar.png" />}

            <div className='user_brief'>
                <h2>{user.name}</h2>
                {user.friends ? <p>{user.friends.length} friends</p> : <p>No Friends... yet</p>}
            </div>

            <div className='flex_wrapper'>
                <button>New post</button>
                <button>Edit profile</button>
            </div>

        </div>
    )
}