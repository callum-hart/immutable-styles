# Getting Started

## Beginner Tutorial

The goal of this tutorial is to introduce immutable styles in a *hopefully* accessible way.

This tutorial will use a fictitious food app to demonstrate how immutable styles is used for styling web interfaces. For the sake of berevity we will focus on styling a part of the app – the restaurant card, which displays information for a given restaurant:

*screenshot of restaurant card*

Although fairly trivial, the restaurant card provides the perfect fit for illustrating the basic concepts of immutable styles without getting distracted by unnecessary and excessive details.

### Setup

The first step is to clone the [turorial]():

```
git clone ....immutable-styles-beginner-tutorial
cd immutable-styles-beginner-tutorial
npm install
```

Then start the application:

```
npm start
```

In its current state the restaurant card looks rather unappetizing since the markup is unstyled.

The files we are interested in are: src/RestaurantCard.jsx – which contains the restaurant cards markup and: src/RestaurantCard.**iss.jsx** – which *will* contain the restaurant cards styles.

You may have noticed `RestaurantCard.iss.jsx` uses a dual file extension of `.iss.jsx`. The first part – `iss` stands for Immutable Style Sheets (or ISS for short). This naming convension allows the compiler to efficiently identify Immutable Style Sheets – whilst preserving JSX syntax highlighting.

> 💡Note: although this tutorial uses React, it should be noted that immutable styles is markup agnostic – meaning it isn’t coupled or biased to a specific way of generating HTML. Just like a CSS pre-processor – immutable styles generates CSS which can be used on any website – rendered server or client-side.

### Boilerplate

`RestaurantCard.iss.jsx` currently contains boilerplate code typical of any Immutable Style Sheet:

```jsx
1|  /** @jsx createStyle */
2|  import { createStyle } from 'immutable-styles';
3|
4|  module.exports = [];
```

Line 2 imports `createStyle` from immutable styles – which is a function that generates immutable rulesets. On line 1 the `createStyle` function is mapped to JSX – meaning any JSX tags in this file will be transpiled to `createStyle` function calls. Line 4 *will* export our immutable rulesets.

### Styling the restaurant card

We are going to create our first immutable ruleset. Since this is the first lets make it special – we will style the restaurants star rating ⭐️.

Replace line 4 of  `RestaurantCard.iss.jsx` with the following snippet:

```jsx
module.exports = [
  <div className="stars">
    margin: 10px 0;

    <span>
      margin-right: 2px;
      font-size: 18px;
      color: gold;
    </span>
  </div>
];
```

Save the file – and you should see the following:

*screenshot of progress so far*

Next, lets focus on the layout of the restaurant card. The details – rating, name, opening time and summary – should sit to the right of the image. Add the following to `RestaurantCard.iss.jsx`:

```jsx
module.exports = [
  <section className="card">
    display: flex;
  </section>,

  <div className="details">
    flex: 1;
    margin-left: 10px;
  </div>,

  <div className="stars">
    {/* ... */}
  </div>
```

With the ruleset for the restaurant card in place lets add some styles that will make it look nicer. Replace lines 5 to 7 with the following snippet:

```jsx
<section className="card">
  display: flex;
  padding: 10px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 2px 0 lightgrey;
</section>,
```

And finally, lets spruce up the typography:

```jsx
<h3>
  margin: 0;
  font-family: sans-serif;
</h3>,

<p>
  margin: 10px 0;
  font-family: sans-serif;
  font-size: 14px;
  color: slategrey;
</p>
```

<center>*</center>

So far, all restaurants in our app will have a five star rating. Sadly, in the real world this isn't always the case – some restaurants get a three star rating. Lets update both the markup and styling accordingly.

Firstly, lets change the default star color from `gold` to `lightgrey`:

```jsx
<div className="stars">
  {/* ... */}

  <span>
    {/* ... */}
    color: lightgrey;
  </span>
</div>
```

Now, in `RestaurantCard.jsx` add the classname "shining" to the top three stars:

```jsx
10| <div className="stars">
11|   <span className="shining">★</span>
12|   <span className="shining">★</span>
13|   <span className="shining">★</span>
14|   <span>★</span>
15|   <span>★</span>
16| </div>
```

If you save the file – you will notice the first three stars are unstyled:

*screenshot of progress so far*

This is to be expeceted. Immutable styles treats type selectors – in this case `<span>` – and selectors with a class – in this case `<span className="shining">` as different selectors – *even though* they target the same element type. The type selector `<span>` only targets elements of type `span` that do not have a class. Elements of type `span` with a class – such as "shining" need to be styled individually. This is one of many *key differences* between immutable styles and CSS, which make immutable rulesets uniquely deterministic.

Lets style the shining stars:

```jsx
<div className="stars">
  {/* ... */}

  <span>
    {/* ... */}
  </span>

  <span className="shining">
    margin-right: 2px;
    font-size: 18px;
    color: gold;
  </span>
</div>
```

You may have noticed 2/3 of CSS declarations – `margin-right` and `font-size` are the same for both normal and shining stars.