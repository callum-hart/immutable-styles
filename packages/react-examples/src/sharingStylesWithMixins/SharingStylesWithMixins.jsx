import React, { Fragment } from 'react';

import "./SharingStylesWithMixins.iss.jsx";

const SharingStylesWithMixins = () => (
  <Fragment>
    <ul>
      <li></li>
      <li>
        <p>Primary</p>
      </li>
      <li>
        <p>Secondary</p>
      </li>
      <li>
        <p>Brand</p>
      </li>
    </ul>
    <ul>
      <li>
        <p>Default</p>
      </li>
      <li>
        <button className="btn-primary">Save</button>
      </li>
      <li>
        <button className="btn-secondary">Back</button>
      </li>
      <li>
        <button className="btn-brand">Promo</button>
      </li>
    </ul>
    <ul>
      <li>
        <p>Hover</p>
      </li>
      <li>
        <button className="btn-primary">Save</button>
      </li>
      <li>
        <button className="btn-secondary">Back</button>
      </li>
      <li>
        <button className="btn-brand">Promo</button>
      </li>
    </ul>
    <ul>
      <li>
        <p>Focus</p>
      </li>
      <li>
        <button className="btn-primary">Save</button>
      </li>
      <li>
        <button className="btn-secondary">Back</button>
      </li>
      <li>
        <button className="btn-brand">Promo</button>
      </li>
    </ul>
    <ul>
      <li>
        <p>Disabled</p>
      </li>
      <li>
        <button className="btn-primary" disabled>Save</button>
      </li>
      <li>
        <button className="btn-secondary" disabled>Back</button>
      </li>
      <li>
        <button className="btn-brand" disabled>Promo</button>
      </li>
    </ul>
  </Fragment>
)

export default SharingStylesWithMixins;
