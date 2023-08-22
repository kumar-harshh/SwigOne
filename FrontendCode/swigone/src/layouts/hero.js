import React from 'react'

export default function Hero() {
  return (
    <div>
        <div>
            <h1>Premium quality</h1>
        </div>
        <div>
            <h1>Lets enter the world of delicacies</h1>
            <form className="signup-form">
            <input type="text" placeholder="Username" className="input-field" required/>
            <input type="email" placeholder="Email" className="input-field" required/>
            <input type="password" placeholder="Password" className="input-field" required/>
            <button type="submit" class="signup-button">Sign Up</button>
        </form>
            
        </div>

    </div>
  )
}
