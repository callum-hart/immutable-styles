# Immutable Mixins

An immutable mixin is a function that takes an immutable ruleset and returns a new immutable ruleset. The primary goal of immutable mixins are to help share styles among similar rulesets. Here is an immutable mixin in its simplest form:

```jsx
import { createStyle, createMixin } from 'immutable-styles';

const Button = createMixin(
  <button>
    padding: 10px;
    border-radius: 3px;
    font-size: 14px;
  </button>
);
```

The example above creates a mixin and assigns it to the const `Button`, which can be used like any other ruleset:

```jsx
<Button />
```

The ruleset above targets elements of type `button` that do not have a class. The target element will recieve the three declarations (`padding`, `border-radius` and `font-size`) returned from the mixin.

A useful pattern is to namespace immutable mixins so they are easy to identify. The following mixin is exactly the same as the `Button` example above:

```jsx
const mixins = {
  button: createMixin(
    <button>
      padding: 10px;
      border-radius: 3px;
      font-size: 14px;
    </button>
  )
}

<!-- Usage: -->

<mixins.button />
```

> 💡Note: from this point onwards all examples will use the `mixins` namespace. Another benefit of namespacing is it allows mixins to be named after JSX elements. Without a namespace mixins cannot have the same name as JSX elements (otherwise the compiler doesn't know whether an element or mixin is being used).

Immutable mixins support the same [JSX attribute]() as immutable rulesets:

```jsx
<mixins.button className="btn" />
```

The example above targets elements of type `button` that have the class `btn`, again recieveing the three declarations returned from the mixin.

Immutable mixins also support child styles:

```jsx
<mixins.button className="btn-primary">
  background: slateblue;
</mixins.button>,

<mixins.button className="btn-primary" pseudo=":hover">
  background: darkslateblue;
</mixins.button>,
```

The example above targets elements of type `button` that have the class `btn-primary`. In addition to the three declarations returned by the mixin, the target element will have a background color of `slateblue` which turns to `darkslateblue` on hover.


