import React from 'react'

export default function Menuitems({ name, price, deliveryTime, imageSrc }){
  return (
    <div className="item-card">
    <div className="item-image">
      <img src={imageSrc} alt='img' />
    </div>
    <div className="item-details">
      <h2>{name}</h2>
      <button>Add to Cart</button>
      <p>₹{price}</p>
      <p>{deliveryTime} Mins</p>
    </div>
  </div>
  )
}


