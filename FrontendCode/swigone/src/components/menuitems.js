import React from 'react';

const menuitemStyle = {
  margin: '10px', // Adjust the margin as needed for spacing
  borderRadius: '10px',
  padding: '10px',
};

const imageStyle = {
  height: '100px',
  width: '100px',
  margin: '10px'
};



export default function Menuitems({ name, price, deliveryTime, imageSrc }) {
  return (
    <div className="item-card" style={menuitemStyle}>
      <div className="item-image" style={imageStyle}>
        <img src={imageSrc} alt='img' style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="item-details">
        <h6>{name}</h6>
        <button className='addtocart-button'>Add to Cart</button>
        <p>₹{price}</p>
        <p>{deliveryTime} Mins</p>
      </div>
    </div>
  );
}
