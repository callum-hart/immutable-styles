# Getting Started

## Beginner Tutorial

The goal of this tutorial is to introduce immutable styles in a *hopefully* accessible way.

This tutorial will use a fictitious food app to demonstrate how immutable styles is used for styling web interfaces. For the sake of berevity we will focus on styling a part of the app – the restaurant card, which displays information for a given restaurant:

*screenshot of restaurant card*

Although fairly trivial, the restaurant card is a good fit for illustrating the basic concepts of immutable styles without introducing unnecessary and excessive details.

### Setup

The first step is to clone the [turorial repository]():

```
git clone ....immutable-styles-beginner-tutorial
cd immutable-styles-beginner-tutorial
npm install 
```

Then start the application:

```
npm start
```

In its current state the restaurant card looks rather unappetizing – the markup is there – the styling is *not*. 

The files we are interested in are: src/RestaurantCard.jsx – which contains the restaurant cards markup and: src/RestaurantCard.**iss.jsx** – which *will* contain the restaurant cards styles.

You may have noticed `RestaurantCard.iss.jsx` uses a dual file extension of `.iss.jsx`. The first part – `iss` stands for Immutable Style Sheets (or ISS for short). This naming convension allows the compiler to efficiently identify Immutable Style Sheets – whilst preserving JSX syntax highlighting. 

> 💡Note: although this tutorial uses React, it should be noted that immutable styles is markup agnostic – meaning it isn’t coupled or biased to a specific way of generating HTML. Just like a CSS pre-processor – immutable styles generates CSS which can be used on any website – rendered server or client-side.

<center>*</center>

Lets first examine `RestaurantCard.iss.jsx`:

```jsx
1|  /** @jsx createStyle */
2|  import { createStyle } from 'immutable-styles';
3|  
4|  module.exports = [];
```

All Immutable Style Sheets:

- Import the `createStyle` function from immutable styles` (line 2). This is comparable to Reacts `createElement`.
- Need to map JSX to the `createStyle`(line 1). By default `babel` maps this to Reacts `createElement`.
- Export styles (line 4)
