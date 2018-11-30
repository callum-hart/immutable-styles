/** @jsx createStyle */
import { createStyle } from '@immutable-styles/core';

export default [
  <section className="card">
    display: flex;
    border-radius: 4px;
    background: white;
    box-shadow: 0 2px 2px 0 lightgrey;
    transition: background .15s ease-in-out, transform .15s ease-in-out;
  </section>,

  <section className="card" pseudo=":hover">
    background: ivory;
    transform: scale(1.05);
    cursor: pointer;
  </section>,

  <section className="card" maxWidth="600">
    margin: 0 20px;
    padding: 0px;

    <img className="image">
      display: none;
    </img>
  </section>,

  <section className="card" minWidth="601">
    padding: 15px;
  </section>,

  <div className="details">
    flex: 1;
    margin: 10px 15px 0;
  </div>,

  <div className="stars">
    margin-bottom: 10px;

    <span>
      margin-right: 2px;
      font-size: 20px;
      color: lightgrey;
    </span>

    <span className="shining">
      margin-right: 2px;
      font-size: 20px;
      color: gold;
    </span>
  </div>,

  <h3>
    margin: 15px 0;
    font-family: sans-serif;
  </h3>,

  <p>
    margin: 10px 0;
    font-family: sans-serif;
    font-size: 14px;
    color: slategrey;
  </p>
];
