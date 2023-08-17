import React from 'react';
import Logo from '../assets/SwigOneLogo.png'
export default function Footer() {
  return (
    <div className='footerbox'>
    <div className='logo'>
        <img src={Logo} alt="logo" />
    </div>
    <div className='listitems'>
    <ul>
        <li>About Us</li>
        <li>Delivery</li>
        <li>Help & Support</li>
        <li>T&C</li>
    </ul>
    </div>
    </div>
  )
}

