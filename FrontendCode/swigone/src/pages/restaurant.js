import React from 'react'
import Header from '../layouts/header'
import Footer from '../layouts/footer'
import Menuitems from '../components/menuitems'
import FoodImg1 from '../assets/paneer-tikka-rice-bowl.png'
import FoodImg2 from '../assets/dal-fry-rice-bowl.png'
import FoodImg3 from '../assets/img3.png'
import FoodImg4 from '../assets/img4.png'



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
        imageSrc={FoodImg1}
      />
      <Menuitems
        name="Dal Fry Rice Bowl - Fried With Ghee"
        price={180}
        deliveryTime={20}
        imageSrc={FoodImg2}
      />
      <Menuitems
        name="Butter Paneer Rice Bowl Large"
        price={299}
        deliveryTime={20}
        imageSrc={FoodImg3}
      />
      <Menuitems
        name="Paneer Signature Rice Bowl (Regular)"
        price={200}
        deliveryTime={20}
        imageSrc={FoodImg4}
      />
      <Menuitems
        name="Soya Signature Rice Bowl"
        price={180}
        deliveryTime={20}
        imageSrc={FoodImg4}
      />
      <Menuitems
        name="Royal Soya Rice Bowl (Jumbo)"
        price={299}
        deliveryTime={20}
        imageSrc={FoodImg4}
      />
    </div>
    </div>
   
    <Footer/>
    </>
  )
}
