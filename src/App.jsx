import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import UserPage from './Components/UserPage/UserPage'
import LoginPage from './Components/Login/LoginPage'
import UserService from './Services/UserService'



function App() {

  const userService = new UserService();

  function logUser(credentials) {

    userService.login(credentials.username, credentials.password)
      .then(response => localStorage.setItem('Key', response.data))
  }


  return (
    <>

      <div>
        <NavBar></NavBar>
      </div>

      <div className='container'>
        <Routes>
          <Route path='/' element={<h1 style={{ margin: 0 }}>Home</h1>} />
          <Route path='profile' element={<UserPage />} />
          <Route path='a' element={<h1>Hello</h1>} />
          <Route path='login' element={<LoginPage onLogin={logUser} />} />
        </Routes>
      </div>

      <footer id="footer">
        <p>©Copyright 2023 Chatter. All rights reversed.</p>
      </footer>
    </>
  )
}

export default App
