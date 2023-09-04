import React from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import Image1 from '../assets/checkoutframe.png'
import Image2 from '../assets/ratingicon.png'
import Image3 from '../assets/discounticon.png'

export default function Cart() {
  return (
    <div>
        <div className="cart-nav">
            <Header />
        <div className="button-group">
            <button className="b1">Kumar Harsh</button>
        </div>
        </div>
      <div className="checkout-main">
      <img
            className="restaurant-img"
            alt="img"
            src={Image1}
          />
        <div className="checkout-metadata">
          <div className="restaurant-details">
            <h3 className="restaurant-name">
              LunchBox - Meals and Thalis
            </h3>
            <div className="restaurant-cuisine">
              North Indian, Punjabi
            </div>
            <div className="order-details">
              <div className="order">
                <div className="order-rating">
                  <img
                    className="rating-icon"
                    alt="img"
                    src={Image2}
                  />
                  <div className="rating">4.0</div>
                </div>
                <div className="total-ratings">100+ ratings</div>
              </div>
              <div className="delivery-time-details">
                <div className="delivery-time">
                  <div className="time">30 Mins</div>
                </div>
                <div className="time-plate">Delivery Time</div>
              </div>
              <div className="order-price-details">
                <div className="order-price">
                  <div className="price">₹200</div>
                </div>
                <div className="price-plate">Cost for two</div>
              </div>
            </div>
          </div>
        </div>
        <div className="offer-section">
          <div className="offer-plate">Offers</div>
          <div className="offer-grp">
            <div className="offers">
              <img className="discount-icon" alt="img" src={Image3} />
              <div className="discount-code">
                50% off up to ₹100 | Use code TRYNEW
              </div>
            </div>
            <div className="offers">
              <img className="discount-icon" alt="img" src={Image3} />
              <div className="discount-code">
                20% off | Use code PARTY
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-main" />
      <div className="cart-body">
        <div className="cart-body-head">
          <div className="cart-plate">
            <div className="cart-tag">Cart</div>
            <div className="cart-items">2 Items</div>
          </div>
          <div className="cart-restaurant-title">
            <div className="title-plate">
              <div className="from-container">
                <span>from</span>
                <span className="restaurant-name"> Lunch box</span>
              </div>
              <div className="cart-parent">
                <div className="cart-item-details">
                  <div className="cart-item-name">Brunch for 2 - Veg</div>
                  <div className="cart-item-price">
                    <span>₹</span>
                    <span className="price-tag">599</span>
                  </div>
                </div>
                <div className="frame-wrapper">
                  <div className="parent">
                    <button class="decrement-button">-</button>
                    <span class="quantity">2</span>
                    <button class="increment-button">+</button>
                  </div>
                </div>
              </div>
              <div className="cart-parent">
                <div className="cart-item-details">
                  <div className="cart-item-name">Paneer Bowl </div>
                  <div className="cart-item-price">
                    <span>₹</span>
                    <span className="price-tag">200</span>
                  </div>
                </div>
                <div className="frame-wrapper">
                  <div className="parent">
                    <button class="decrement-button">-</button>
                    <span class="quantity">1</span>
                    <button class="increment-button">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="subtotal-frame">
            <div className="subtotal-parent">
              <div className="subtotal-tag">Subtotal</div>
              <div className="sutotal-amount">₹799</div>
            </div>
            <div className="terms">Extra charges may apply</div>
          </div>
          <div className="checkout-wrapper">
            <button className="checkout-button">Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

