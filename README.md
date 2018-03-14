Immutable Styles
A JavaScript library for styling web interfaces with a focus on predictability and robustness. It uses immutability to remove side effects often tied to CSS.

What is Immutable Styles?

Immutable Styles is a cross between a CSS pre-processor and a CSS in-JS library.
Styles are written using JavaScript which are subsequently compiled to CSS.
The library has 2 goals:
Make styles for the web predictable
Make styles for the web robust
If you have ever encountered styles that were neither expected nor desired you probably  met a CSS side effect; most likely a consequence of:
Selectors clashing with other selectors
Selectors targeting unwanted elements
Styles overriding other styles
Elements inheriting undesirable styles
As the name suggests the library uses immutability to help remove these side effects.
With Immutable Styles all CSS rules are immutable. An immutable style cannot change once created, which means it can never be overridden. This alone solves a to c (we will see the solution to d later).
Why (The case for Immutable Styles)
The behaviour of CSS is both unpredictable and unreliable which means we cannot confidently make changes.
Changes to CSS must be made carefully. Adding or removing styles, reordering rule-sets, changing selector specificity, using important - all of these can break things. Something that passed QA yesterday can be broken tomorrow.
It would be fair to say dealing with CSS, and more specifically intentional and unintentional overrides is a delicate business.
Immutable Styles rejects overrides as a sustainable and scalable solution to large-scale CSS for several reasons:
Unpredictable No guarantee who "winning style" is. Overrides rely on cascade, specificity and importance - all of which are vulnerable to change.
Unreliable The longevity of an override is unknown. Just because a style wins today doesn’t mean it always will.
Difficult to Contain Global scope permits anyone to override, whilst a lack of encapsulation dampens efforts to protect styles from being overridden.
Obfuscate Intent It’s hard to differentiate between an intentional and unintentional override - which can be left to interpretation.
No Escape It’s hard to escape an overriding system. There is a correlation between the number of overrides and the time/energy spent managing them.
Self-perpetuating The more overrides exist the more overriding you need to do.
Hard to Scale Overrides appear harmless at first but become challenging to manage at scale.
Hard to Troubleshoot Side effects of overrides aren't always immediately apparent.
Parallels can be drawn between mutable state in programs and overrides in CSS. When a style overrides another it mutates (changes) the value of the original style.
Likewise if we view CSS rules as global variables then overrides are comparable to re-assigning global variables on an ad hoc basis, which is considered bad practice in other languages.
Over recent years the front-end community has seen a huge shift towards removing mutable state in our applications - yet CSS has been ignored.
But why should the way we build applications be different to how we style them? We should unite construction with cosmetics.
Immutable Styles is an attempt to remove mutation (a.k.a overrides) and thus complexity from CSS. You can read more on this topic in the post: “CSS Overrides: Friend or Foe?”
