import React from 'react';

import "./App.iss.jsx";

import SharingStylesWithMixins from './sharingStylesWithMixins/SharingStylesWithMixins';
// import SharingStylesWithDetachedRulesets from './sharingStylesWithDetachedRulesets/SharingStylesWithDetachedRulesets';

const App = () => (
  <section className="app">
    <SharingStylesWithMixins />
    {/* <SharingStylesWithDetachedRulesets /> */}
  </section>
)

export default App;
