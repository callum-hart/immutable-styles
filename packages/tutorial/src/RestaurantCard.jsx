import React from 'react';

import "./RestaurantCard.iss.jsx";

const RestaurantCard = () => (
  <section className="card">
    <img src="https://i.imgur.com/WjAuN4W.png" height="140" width="100" className="image" />

    <div className="details">
      <div className="stars">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <h3>Won Ton</h3>
      <p>10am - 11pm</p>
      <p>Sushi, Japanese Cuisine, Drinks</p>
    </div>
  </section>
);

export default RestaurantCard;
