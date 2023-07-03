import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar/NavBar'
import UserPage from './Components/UserPage/UserPage'
import LoginPage from './Components/Login/LoginPage'
import HomePage from './Components/HomePage'




function App() {

  return (
    <>

      <div>
        <NavBar></NavBar>
      </div>

      <div className='container'>
        <Routes>
          <Route path='home' element={<HomePage/>} />
          <Route path='profile' element={<UserPage />} />
          <Route path='login' element={<LoginPage/>} />
        </Routes>
      </div>

      <footer id="footer">
        <p>©Copyright 2023 Chatter. All rights reversed.</p>
      </footer>
    </>
  )
}

export default App
