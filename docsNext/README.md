# Immutable Styles
Catch CSS bugs ahead of time

> 📖 **Immutable Styles** | ɪˈmjuːtəb(ə)l | stʌɪl |

> A JavaScript library for styling web interfaces with a focus on predictability and robustness. It uses immutability to remove side effects often tied to CSS.

## Features

- Build Time Errors
- Override Prevention
- Single Inheritance Model
- Discrete Breakpoints
- Strict CSS Inheritance
- Unambiguos Declarations
- Duplicate Property Detection
- Runtime Override Protection
- Pre-processor Features
- Strict Type Selectors

## What is Immutable Styles?

Immutable Styles is a cross between a CSS pre-processor and a CSS in-JS library. Styles are written using JavaScript which are subsequently compiled to CSS. The library has 2 goals:

1. Make styles for the web **predictable**
2. Make styles for the web **robust**

If you have ever encountered styles that were neither expected nor desired you probably met a CSS side effect; most likely a consequence of:

- a) Selectors clashing with other selectors
- b) Selectors targeting unwanted elements
- c) Styles overriding other styles
- d) Elements inheriting undesirable styles

As the name suggests the library uses immutability to help remove these side effects. With Immutable Styles all CSS rules are immutable. An immutable CSS rule cannot change once created, which means it can **never** be overridden. This alone solves a, b and c (we will see the solution to d later).