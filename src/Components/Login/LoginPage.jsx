import { useState } from "react";

export default function LoginPage({onLogin}) {


    const [loginCredentials,setLoginCredentials] = useState({username: '', password: ''})

    //send login credentials back to App component via props(onLogin), 
    // Then reset the loginCredentials state , so then the form will appear empty again
    function onSubmitHandler(e){
        e.preventDefault();
        onLogin(loginCredentials)
        setLoginCredentials({username:'',password:''})

    }


    function onInputChange(input){

        setLoginCredentials(credentials => {
            return {...credentials, [input.target.name]: input.target.value}
        })

    }


    return (
        <>
            <h2>Login Page</h2>
        <form onSubmit={onSubmitHandler}>

            <div>
                <input type="text" name="username" placeholder="User Name" value={loginCredentials.username} required onChange={(e) => onInputChange(e)}/>
                <input type="password" name="password" placeholder="Password" value={loginCredentials.password} required onChange={(e) => onInputChange(e)}/>
            </div>

            <button>Login</button>
        </form>
        </>
    )
}