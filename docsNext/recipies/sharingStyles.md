# Sharing Styles

Immutable styles provides a couple of ways to share common styles among similar rulesets:

1. [Mixins]()
2. [Detached Rulesets]()

Both offer a slightly different technique that ultimetley achieves the same goal (sharing styles). We will continue the button example first introduced in ["The Basics"]() guide.

### Example

The designer has returned to the styleguide and added a few different button variations. Each variation has three UI states: the default state, hover state and disabled state.

Here is our fictitious styleguide:

*screenshot of styleguide*

From the styleguide above we can identify common declarations shared among all buttons. Each button has the same:

- `padding`
- `border-width`
- `border-style`
- `font-size`
- `font-family`
- `font-weight`

In contrast the buttons have unique declarations specific to each variation:

- `background`
- `border-color`
- `color`