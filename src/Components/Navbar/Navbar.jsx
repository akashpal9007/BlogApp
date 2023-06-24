import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className='Navbar-l'><Link to="/" style={{textDecoration:"none", color:"white"}}>Blog</Link></div>
        <div className='Navbar-r'>
            <div>About</div>
            <div><Link to='/fav' style={{textDecoration:"none", color:"white"}}>Favourites</Link></div>
            <div>Contact Us</div>
        </div>
    </div>
  )
}

export default Navbar