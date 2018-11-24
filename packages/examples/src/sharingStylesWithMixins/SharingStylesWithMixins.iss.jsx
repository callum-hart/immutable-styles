/** @jsx createStyle */
import { createStyle, createMixin } from '@immutable-styles/core';

const button = {
  default: createMixin(
    <button>
      padding: 10px 30px;
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      font-size: 1rem;
      font-family: 'Open Sans', sans-serif;
    </button>
  ),
  hover: createStyle(
    <button pseudo=":hover">
      cursor: pointer;
    </button>
  ),
  focus: createMixin(
    <button pseudo=":focus">
      outline: none;
      box-shadow: 0 0 0 3px #A8CBF5;
    </button>
  ),
  disabled: createMixin(
    <button pseudo=":disabled">
      opacity: 0.6;
      pointer-events: none;
    </button>
  )
};

module.exports = [
  <ul>
    margin: 0;
    padding: 0;
    <li>
      list-style: none;
      display: flex;
      align-items: center;
      height: 100px;
      padding: 0 20px;
      border-bottom: 1px solid #D5D6D7;
      <p>
        font-family: 'Open Sans', sans-serif;
        font-weight: bold;
        font-size: 15px;
        color: #3D4247;
      </p>
    </li>
    <li pseudo=":first-of-type">
      <p>
        margin-top: 70px;
      </p>
    </li>
  </ul>,

  // Primary Button

  <button.default className="btn-primary">
    background: #4A96F8;
    border-color: #3B7AC9;
    color: #FFFFFF;
  </button.default>,
  <button.hover className="btn-primary">
    background: #3B7AC9;
  </button.hover>,
  <button.focus className="btn-primary" />,
  <button.disabled className="btn-primary" />,

  // Secondary Button

  <button.default className="btn-secondary">
    background: #D5DFEB;
    border-color: #BFCDDD;
    color: #3D4247;
  </button.default>,
  <button.hover className="btn-secondary">
    background: #BFCDDD;
  </button.hover>,
  <button.focus className="btn-secondary" />,
  <button.disabled className="btn-secondary" />,

  // Brand Button

  <button.default className="btn-brand">
    background: #F2C07C;
    border-color: #DFAD70;
    color: #44321B;
  </button.default>,
  <button.hover className="btn-brand">
    background: #DFAD70;
  </button.hover>,
  <button.focus className="btn-brand" />,
  <button.disabled className="btn-brand" />
];
