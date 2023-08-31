import React from 'react'
import Header from '../layouts/header'
import Footer from '../layouts/footer'
import Menuitems from '../components/menuitems'

//name. price and other parameters as an object array
export default function Restaurant() {
  return (
    <>
    <div className='restaurant-nav'>
    <Header/>
    <div className='button-group'>
    <button className='b1'>Kumar Harsh</button>
    <button className='b2'>Logout</button>
    </div>
    </div>
    <div className='restaurant-hero'>
    <h3>LunchBox-Meals & Thalis</h3>
    <div className="menu">
      <Menuitems
        name="Paneer Tikka Rice Bowl"
        price={200}
        deliveryTime={20}
        imageSrc=""
      />
      <Menuitems
        name="Dal Fry Rice Bowl - Fried With Ghee"
        price={180}
        deliveryTime={20}
        imageSrc="dal-fry-rice-bowl.jpg"
      />
      <Menuitems
        name="Butter Paneer Rice Bowl Large"
        price={299}
        deliveryTime={20}
        imageSrc="butter-paneer-rice-bowl.jpg"
      />
      <Menuitems
        name="Paneer Signature Rice Bowl (Regular)"
        price={200}
        deliveryTime={20}
        imageSrc="paneer-signature-rice-bowl.jpg"
      />
      <Menuitems
        name="Soya Signature Rice Bowl"
        price={180}
        deliveryTime={20}
        imageSrc="soya-signature-rice-bowl.jpg"
      />
      <Menuitems
        name="Royal Soya Rice Bowl (Jumbo)"
        price={299}
        deliveryTime={20}
        imageSrc="royal-soya-rice-bowl.jpg"
      />
    </div>
    </div>
   
    <Footer/>
    </>
  )
}
