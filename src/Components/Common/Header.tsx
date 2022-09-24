import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'


const Header = () => {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.clear();
    navigate('/signup');
  }
// console.log(auth)
  return (
    <div>
      <header>
        <div className="hdcontainer">
            <nav className="nav_bar">
            { auth ?   <>

            <Link  className='nav_bar_link_logo' to="/">Logo</Link>
                <Link  className='nav_bar_link' to="/">Products </Link>
                <Link  className='nav_bar_link' to="/add">Add Products</Link>
                <Link  className='nav_bar_link' to="/update">Update Products</Link>
                <Link  className='nav_bar_link' to="/profile">Profile</Link>
                <Link  className='nav_bar_link' to="/signup" onClick={logout} >Logout </Link> 
                </>:
               <> <Link  className='nav_bar_link' to="/signup">Sign Up</Link> 
                <Link  className='nav_bar_link' to="/login">login</Link> </>
               }
             
            </nav>
        </div>
      </header>
    </div>
  )
}

export default Header
