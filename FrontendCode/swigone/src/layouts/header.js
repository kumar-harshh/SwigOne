import React from 'react'
import Logo from '../assets/SwigOneLogo.png'


export default function Header() {
  return (
    <div className='header'>
      <div className='header-logo'>
        <img src={Logo} alt="img" />
      </div>
      <div className='header-button'>
        <button>Create a New Account</button>
      </div>

    </div>
  )
}
