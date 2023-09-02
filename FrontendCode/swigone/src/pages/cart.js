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
              <img className="sep-bar" alt="" src="/vector-1.svg" />
              <div className="delivery-time-details">
                <div className="delivery-time">
                  <div className="time">30 Mins</div>
                </div>
                <div className="time-plate">Delivery Time</div>
              </div>
              <img className="sep-bar" alt="" src="/vector-1.svg" />
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
      <Footer />
    </div>
  );
}
