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

const createGroup = Tag => createMixin(
  <Tag>
    padding: 8px 12px;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    background: cadetblue;
    color: ivory;
  </Tag>
);

const groups = {
  link: createGroup('a'),
  button: createGroup('button')
};

export default [
  <groups.link className="btn" />,
  <a className="btn">
    text-decoration: none;
  </a>,

  <groups.button className="btn" />,
  <button className="btn">
    border: none;
    cursor: pointer;
  </button>
];