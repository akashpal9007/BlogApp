import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className='Navbar-l'>Blog</div>
        <div className='Navbar-r'>
            <div>About</div>
            <div>Favourites</div>
            <div>Contact Us</div>
        </div>
    </div>
  )
}

export default Navbar