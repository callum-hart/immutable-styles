/** @jsx createStyle */
import { createStyle } from '@immutable-styles/core';

export default [
  <html>
    height: 100%;
  </html>,

  <body>
    height: 100%;
    margin: 0;
    background-image:
      linear-gradient(45deg, #f8f8f8 25%, transparent 25%),
      linear-gradient(135deg, #f8f8f8 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #f8f8f8 75%),
      linear-gradient(135deg, transparent 75%, #f8f8f8 75%);
    background-size: 20px 20px;
    background-position: 0 0, 10px 0, 10px -10px, 0px 10px;
    background-color: #f4f4f4;
  </body>,

  <div className="root">
    height: 100%;
  </div>,

  <section className="app">
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  </section>
];
