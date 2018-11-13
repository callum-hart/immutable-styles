# Strict Inheritance

Strict inheritance prevents inheritable CSS properties from being inherited. At first glance this may seem like an odd feature, however the current CSS inheritance model can quickly get out-of-hand – and thus become unpredictable. An example taken from one of the top 30 most visited sites on [Alexa](alexa.com/topsites) can be seen below:

*what-the-font.png*

We can see 10 instances where the developer(s) intent was to change the `font-size` of the target element, or more likey this is the result of poorly scoped. Either way the `font-size` of the target element is extremely brittle. In cases like these a change in HTML structure, specificity or cascade can produce a different outcome.

In this case `!important` has been used to protect the target elements `font-size` from changes to specificity or cascade. Unfortunetly the winning declaration value is `inherit` which means a futher step is needed to track where the `font-size` is inherited from.

- imagine in future the font-size needs to change as part of a site redesign...