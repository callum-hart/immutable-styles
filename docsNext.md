**Features:**

- Override detection
- Build time errors
- Discrete breakpoints (breakpoint collision detection)
- Single inheritance model
- Strict CSS inheritance
- Duplicate property prevention
- Runtime override protection (styles are resiliant to changes in HTML)
- Ambiguous property detection (no shorthands)
- Pre-processor features (variables, mixins, etc...)

**Changelog**

- Usage with JSX
- Webpack plugin, with hot reload 🔥
- Elm inspired error messages, with hints!
- Ambiguous property mixins
- Nested subclass error handling
- `createCSS` now accepts an object aswell as array
- Better code coverage

**Things to explain**

- What's an Immutable Style
- What's ISS (Immutable Style Sheet)
- What's an Immutable Style attribute
- What's the equivalent of a:
	- CSS ruleset
	- CSS selector
	- CSS selector for child element. All children are immediate!
	- CSS declaration(s)
	- Media query
	- Pseudo selector
	- Pseudo element
	- CSS variables
	- Sass/LESS mixin
- Include example project
- How it works: design decisions, why the generated CSS is how it is
- Usage (with webpack)

**Roadmap:**

- Snapshot testing
- Custom element property validations. i.e: `span` can't use `display: block;`
- Inferred discrete breakpoints. Max-widths are generated from min-widths
- Inheritance blockers. The rule: `button { color: black; }` generates a rule that prevents child elements from inheriting the color: `button * { color: 'needs to be explicity set' }`
- Runtime validations (see `immutableStyles.js:120`).
- Extend should be an attribute `extendFrom`, rather than naming convention
- Extend from an element that doesn't have a className i.e: `p`
- Differentiate between subclass and modifier class.
	- Subclass is used on its own, i.e: `btn-primary`
	- Modifier class is used with original class, i.e: `btn btn--loading`
	- `modifierFor` attribute
- Allow modules to expose styles that can be redefined at compile-time (similar to single inheritance model).
