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

In its current state the restaurant card looks rather unappetizing – the markup is there –  the styling however is not.

The files we are interested in are: src/RestaurantCard.jsx – which contains the restaurant cards markup and: src/RestaurantCard.**iss.jsx** – which *will* contain the restaurant cards styles.

You may have noticed `RestaurantCard.iss.jsx` uses a dual file extension of `.iss.jsx`. The first part – `iss` stands for Immutable Style Sheets (or ISS for short). This naming convension allows the compiler to efficiently identify Immutable Style Sheets – whilst preserving JSX syntax highlighting.

> 💡Note: although this tutorial uses React, it should be noted that immutable styles is markup agnostic – meaning it isn’t coupled or biased to a specific way of generating HTML. Just like a CSS pre-processor – immutable styles generates CSS which can be used on any website – rendered server or client-side.

### Boilerplate

`RestaurantCard.iss.jsx` currently contains boilerplate code typical of any  Immutable Style Sheet:

```jsx
1|  /** @jsx createStyle */
2|  import { createStyle } from 'immutable-styles';
3|
4|  module.exports = [];
```

Line two imports `createStyle` from immutable styles – which is a function that generates immutable rulesets. On line one `createStyle` is mapped to JSX – meaning any JSX tags in this file will be transpiled to `createStyle` function calls. Line four *will* export our immutable rulesets.

### Styling the restaurant card

We are going to create our first immutable ruleset. Since this is the first lets make it special – we will style the restaurants star rating ⭐️.

Replace line four of  `RestaurantCard.iss.jsx` with the following snippet:

```jsx
module.exports = [
  <ul className="stars">
    padding-left: 0;
    display: flex;
    <li>
      list-style-type: none;
      color: gold;
    </li>
  </ul>
];
```

Save the file – you should see the following:

*screenshot of progress so far*

Next, lets focus on the restaurant cards layout. The details – rating, name, opening time and summary – should sit to the right of the image. Add the following to `RestaurantCard.iss.jsx`:

```jsx
module.exports = [
  <section className="card">
    display: flex;
  </section>,
  <div className="details">
    flex-grow: 1;
  </div>,
  <ul className="stars">
    ...
```

Now that we have the ruleset for the `card` lets apply styles that will make it look nicer. Replace lines five to seven with the following snippet:

```jsx
  <section className="card">
    display: flex;
    background-color: white;
    box-shadow: 0 2px 2px 0 lightgrey;
  </section>,
```

Finally, lets make the typography look...

<center>*</center>

So far, all restaurants in our app will have a five star rating. Sadly, in the real world this isn't always the case – some restaurants get a three star rating. Lets update both the markup and styling accordingly.

In `RestaurantCard.jsx` lets add the classname "shining" to the first three stars:

```jsx
10| <ul className="starRating">
11|   <li className="shining">★</li>
12|   <li className="shining">★</li>
13|   <li className="shining">★</li>
14|   <li>★</li>
15|   <li>★</li>
16| </ul>
```

If you save the file – you will notice the first three stars are unstyled:

*screenshot of progress so far*






