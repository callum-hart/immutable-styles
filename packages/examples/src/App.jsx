import React from 'react';

import "./App.iss.jsx";

import SharingStylesWithMixins from './sharingStylesWithMixins/SharingStylesWithMixins';
// import SharingStylesWithDetachedRulesets from './sharingStylesWithDetachedRulesets/SharingStylesWithDetachedRulesets';
// import GroupedSelectors from './groupedSelectors/GroupedSelectors';

const App = () => (
  <section className="app">
    <SharingStylesWithMixins />
    {/* <SharingStylesWithDetachedRulesets /> */}
    {/* <GroupedSelectors /> */}
  </section>
)

export default App;
