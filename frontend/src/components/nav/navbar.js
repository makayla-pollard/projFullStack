import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import movieLogo from '../../img/movie logo.png';

import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {
    let navigate = useNavigate();
    const loggingOut = () => {
        window.localStorage.removeItem("LoggedIn");
        navigate('/');
    } 

    const user = window.localStorage.getItem("LoggedIn");

    if(user == null){
        return(
            <header className='headerNav'>    
                <div className='main'>
                <div className="logo">
                <img className='image' src={movieLogo}/>
                {/* <h1>Mental Drain</h1> */}
            </div>
                    <nav className='links'>
                        <ul>
                            <li>
                                <NavLink to="/">Popular</NavLink>
                            </li>
                            <li>
                                <NavLink to="/search">Search</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

            </header>
        );
    }else{
        return(
            <header className='headerNav'>    
                <div className='main'>
                <div className="logo">
                <img className='image' src={movieLogo}/>
                {/* <h1>Mental Drain</h1> */}
            </div>
                    <nav className='links'>
                        <ul>
                            <li>
                                <NavLink to="/">Popular</NavLink>
                            </li>
                            <li>
                                <NavLink to="/search">Search</NavLink>
                            </li>
                            <li>
                                <div className='logout' onClick={loggingOut}>Logout</div>
                            </li>
                        </ul>
                    </nav>
                </div>

            </header>
        );
    }

    
}

export default NavBar;