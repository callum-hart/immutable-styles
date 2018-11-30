/** @jsx createStyle */
import { createStyle } from '@immutable-styles/core';

const fontSmall = `
  font-family: 'Open Sans', sans-serif;
  font-size: 0.75rem;
  line-height: 1.5rem;
`;

const fontMedium = `
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  line-height: 2rem;
`;

const fontLarge = `
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5rem;
  line-height: 3rem;
`;

const fontExtraLarge = `
  font-family: 'Open Sans', sans-serif;
  font-size: 2rem;
  line-height: 4rem;
`;

// usage:

export default [
  <h1>
    { fontExtraLarge }
  </h1>,
  <h2>
    { fontLarge }
  </h2>,
  <h3>
    { fontMedium }
  </h3>,
  <th>
    { fontMedium }
  </th>,
  <td>
    { fontSmall }
  </td>,
  <p>
    { fontSmall }
  </p>,
  <strong>
    { fontSmall }
  </strong>
];