import { Link, NavLink } from "react-router-dom";
import './NavBar.css';
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {


    return (

        <nav className="navbar">

            <Link to={'/'}  className="navbar_logo">Chatter</Link>

            <SearchBar></SearchBar>    

            <ul>
                <li><NavLink to={'/profile'} className={({ isActive }) => isActive ? 'active_link' : 'inactive_link'}>Profile</NavLink></li>
                <li><NavLink to={'/home'} className={({ isActive }) => isActive ? 'active_link' : 'inactive_link'}>Home</NavLink></li>
                <li><NavLink to={'/groups'} className={({ isActive }) => isActive ? 'active_link' : 'inactive_link'}>Groups</NavLink></li>
                <li><NavLink to={'/login'} className={({ isActive }) => isActive ? 'active_link' : 'inactive_link'}>Login</NavLink></li>
            </ul>
        </nav>


    )
}