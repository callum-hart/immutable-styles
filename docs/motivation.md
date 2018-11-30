# The Case for Immutable Styles

Those familiar with CSS will have heard the term "winning style"; in which CSS rules compete against one another. Importance, specificity and cascade decide which styles win via overrides.

Much of what makes CSS development difficult is ensuring the styles we want, win; and the styles we don’t want, lose. Anytime we edit a CSS file we risk changing the conditions that influence which overrides win. This makes CSS incredibly fragile and unpredictable.

Overrides make CSS **fragile** since what they rely on (importance, specificity, and cascade) are all vulnerable to change. Changes to HTML structure and attributes (classes) can introduce previously non-existent overrides.

Overrides make CSS **unpredictable** because:

1. The global scope permits anyone to override.
2. The side effects aren’t immediately apparent (exaggerated by #1).
3. A lack of encapsulation dampens efforts to protect styles from being overridden.
4. The longevity of an override is unknown. Just because a style wins today doesn’t mean it always will.
5. They obfuscate developer intent. It’s hard to differentiate between an intentional and unintentional override (which is open to interpretation).

Parallels can be drawn between mutable state in programs and overrides in CSS. When a style overrides another it mutates (changes) the value of the original style. Over recent years the front-end community has seen a huge shift towards removing mutable state from how we *build* applications, yet the way we *style* applications has remained the same.

But why should the way we build applications be different to how we style them? We should unite construction with cosmetics. Immutable styles is an attempt to remove mutation (a.k.a overrides) and thus complexity from CSS.

You can read more on this topic in the blog post: [CSS Overrides: Friend or Foe?](http://www.callumhart.com/blog/css-overrides-friend-or-foe)
