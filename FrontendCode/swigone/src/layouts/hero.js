import React from 'react'

export default function Hero() {
  return (
    <div>
        <div className="ellipse"></div>;
        <div className='hero-container'>
        <div className='page-content'>
            <h1>Premium <span className='colored-h1'>quality</span></h1>
            <h1>Food for <span className='colored-h1-2'>healthy life    
            <div className="slider-container">
                <div className="slider"></div>
             </div>
            & Mood</span><div className="slider-container">
                <div className="slider-2"></div>
             </div></h1>
            <p>
                Started with the vision for serving pure, hygienic and Vegetarian food in the prestigious campus of Banaras Hindu Unversity.
                Food is a necessity for a healthy and prosperous life which keeps your thoughts pure and positive and thus results in better life.
            </p>
            <div className='location-list'>
                <ul >
                    <li>Hyderabad</li>
                    <li>Chennai</li>
                    <li>Mumbai</li>
                    <li>Kolkata</li>
                    <li>Bangalore</li>
                </ul>
            </div>
           
        </div>
        <div className='signup-container'>
            <form className="signup-form">
            <h1>Create an Account</h1>
            <input type="text" placeholder="Username" className="input-field" required/>
            <input type="email" placeholder="Email" className="input-field" required/>
            <input type="phone" placeholder="Phone" className="input-field" required/>
            <input type="password" placeholder="Password" className="input-field" required/>
            <button type="submit" class="signup-button">Sign Up</button>
            </form>    
        </div>
        </div>
    </div>
  )
}
