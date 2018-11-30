/** @jsx createStyle */
import { createStyle, createMixin } from '@immutable-styles/core';

/**
 * ⚗️ Experimental. Ongoing investigation into how grouped selectors
 * in immutable styles could work.
 *
 * Task: replicate the following CSS with immutable rulesets:
 *
 *  a.btn,
 *  button.btn {
 *    padding: 8px 12px;
 *    font-family: 'Open Sans', sans-serif;
 *    font-size: 14px;
 *    background: cadetblue;
 *    color: ivory;
 *  }
 *
 *  a.btn {
 *    text-decoration: none;
 *  }
 *
 *  button.btn {
 *    border: none;
 *    cursor: pointer;
 *  }
 */

// const createBtn = Tag => createMixin(
//   <Tag>
//     padding: 8px 12px;
//     font-family: 'Open Sans', sans-serif;
//     font-size: 14px;
//     background: cadetblue;
//     color: ivory;
//   </Tag>
// );

// const Link = createBtn('a');
// const Button = createBtn('button');

// export default [
//   <Link className="btn" />,
//   <a className="btn">
//     text-decoration: none;
//   </a>,

//   <Button className="btn" />,
//   <button className="btn">
//     border: none;
//     cursor: pointer;
//   </button>
// ];

// Could achieve this via detached rulesets:

const btnStyles = `
  padding: 8px 12px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  background: cadetblue;
  color: ivory;
`;

export default [
  <a className="btn">
    { btnStyles }
    text-decoration: none;
  </a>,

  <button className="btn">
    { btnStyles }
    border: none;
    cursor: pointer;
  </button>
];