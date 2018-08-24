## TOC

```
- README
	- Features
	- What is Immutable Styles
	- The Case for Immutable Styles
- Basic Concepts
	- What is a CSS override
	- What is the beef with overrides?
	- What is an Immutable Style
	- What is an Immutable Style Sheet
	- Written using JSX
	- Four ~Props~ Attributtes
- Getting Started
	- Install
	- Usage with Webpack
	- Beginner Tutorial
- Cheetsheet
	- CSS Comparison
	- Build Time Errors
- Recipies
	- Button MVC
	- Themes 
- Advanced Concepts
	- Single Inheritance Model
	- Strict CSS Inheritance
	- Discrete Breakpoints
	- Unambiguos Declarations
	- Pre-processor'esque Features
	- How it Works
- Changelog
- Roadmap
```


## README

Catch CSS bugs ahead of time

> 📖 **Immutable Styles** | ɪˈmjuːtəb(ə)l | stʌɪl |

> A JavaScript library for styling web interfaces with a focus on predictability and robustness. It uses immutability to remove side effects often tied to CSS.

### Features

- Build Time Errors
- Override Prevention
- Single Inheritance Model
- Discrete Breakpoints
- Strict CSS Inheritance
- Unambiguos Declarations
- Duplicate Property Detection
- Runtime Override Protection (styles are resiliant to changes in HTML)
- Pre-processor Features (variables, mixins, etc...)

### What is Immutable Styles
- see current README.md

### The case for Immutable Styles
- see current README.md

## Basic Concepts

### What is a CSS override
- A style can be overriden (few ways this can happen)
- An inherited style can be overriden
- Brief walkthrough of how CSS overrides work (cascade, specificity, !important)
	- Explain different scenarios & their outcomes (winning style🏅)

### What is an Immutable Style
- Brief explanation / quote of what immutability is
- Style that can never be overridden (similar to `const`)

### What is an Immutable Style Sheet
- Immutable Styles are written in `.iss` files, which stands for Immutable Style Sheet.

### Written using JSX
- Represented using a [Tree]() data structure
- Share the same structure as HTML
- Written using JSX (like React). 
- 💡Note: other than using JSX the similarites between React and Immutable Styles end there. Immutable Styles is only concerned with styling web interfaces.

### Four ~Props~ Attributtes
- Like React components, an Immutable Style can have props. 
- 💡 Note: unlike React, the props are predefined by the library. User defined props are  [forbidden]().
- To distinguish between JSX props and CSS properties, the JSX props exposed by Immutable Styles are referred to as **attributes**.
- There are four attributtes:
	1. className
	2. pseudo
	3. minWidth
	4. maxWidth

## Getting Started

- Install
- Usage with webpack
- Beginner Tutorial (example project)

## Cheetsheet

- CSS Comparison, what is the equivalent of a:
	- CSS ruleset
	- CSS selector
	- Pseudo selector
	- Pseudo element
	- CSS declaration(s)
	- Media query
	- CSS variable
	- Pre-processor mixin
- Build Time Errors 
	- see compileTimeErrors.md, need to update examples to use JSX

## Recipies

- Button MVC (like TODO MVC)
	- set of buttons
- Themes: see features.md, need to expand example

## Advanced Concepts

- Single Inheritance Model
	- see singleInheritanceModel.md, need to update examples to use JSX
- Strict CSS Inheritance
- Discrete Breakpoints
- Unambiguos Declarations
- Pre-processor'esque Features
	- see features.md
- How it Works
	- Design decisions
	- Drilldown into the generated CSS

## Changelog

- Usage with JSX
- Webpack plugin, with hot reload 🔥
- Elm inspired error messages, with hints!
- Ambiguous property mixins
- Nested subclass error handling
- `createCSS` now accepts an object aswell as array
- Better code coverage

## Roadmap 🗺

- Testing styles with snapshots
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
- Entity relationship modelling: https://github.com/callum-hart/mono/blob/master/misc/notes/entity%20relationship%20model.md
