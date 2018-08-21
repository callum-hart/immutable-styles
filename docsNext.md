## Features

- Build time errors
- Override prevention
- Single inheritance model
- Discrete breakpoints (breakpoint collision detection)
- Strict CSS Inheritance
- Unambiguos CSS declarations (no shorthands)
- Duplicate property detection
- Runtime override protection (styles are resiliant to changes in HTML)
- Pre-processor features (variables, mixins, etc...)

## Introduction

- What is Immutable Styles **done**
- The case for Immutable Styles **done**

## Basic Concepts

- What is a CSS override
- What is an Immutable Style
- What is an Immutable Style Sheet
- Written using JSX (same structure as DOM) 
- The four attributtes (className, minWith, maxWidth, pseudo)

## Advanced Concepts

- Single Inheritance Model
- Discrete Breakpoints
- Strict CSS Inheritance
- Unambiguos Declarations
- Pre-processor'esque Features
- Themes
- How it works: design decisions, why the generated CSS is how it is

## Cheetsheet

- CSS Comparison, what's the equivalent of a:
	- CSS ruleset
	- CSS selector
	- CSS/Pre-processor selector for child element. All children are immediate!
	- CSS declaration(s)
	- Media query
	- Pseudo selector
	- Pseudo element
	- CSS variable
	- Pre-processor mixin
- Compile Time Errors

## Getting Started

- Install
- Usage with webpack
- Tutorial (example project)

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
