# Immutable Mixins

An immutable mixin is a function that takes an immutable ruleset and returns a new immutable ruleset. Immutable mixins help share common styles used accross similar rulesets. Here is an immutable mixin in its simplest form:

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

The example above creates a mixin and assigns it to the variable `Button`. The `Button` variable can be included in JSX just like any other immutable ruleset:

```jsx
<Button />
```

The example above targets elements of type `button` that do not have a class. The target element will recieve the three declarations: `padding`, `border-radius` and `font-size` returned from the mixin.

A useful pattern is to namespace immutable mixins so they are easier to identify. The following mixin is exactly the same as the `Button` example above:

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

> 💡Note: from here onwards all examples will follow the namespace pattern. Alongside improving readability namespacing allows mixins to be named after JSX elements. Without a namespace mixins cannot have the same name as JSX elements (otherwise the compiler doesn't know whether an element or mixin is being used).

Immutable mixins support the same [JSX attribute]() as immutable rulesets:

```jsx
<mixins.button className="btn" />
```

The example above targets elements of type `button` that have the class `btn`. The target element will recieve the three declarations (`padding`, `border-radius`, `font-size`) returned from the mixin.

### Children

Immutable mixins support child styles:

```jsx
<mixins.button className="btn-primary">
  background: slateblue;
</mixins.button>
```

The example above targets elements of type `button` that have the class `btn-primary`. In addition to the three declarations returned from the mixin, the target element will have a background color of `slateblue`.

The background color can be changed to `darkslateblue` on hover using the `pseudo` attribute:

```jsx
<mixins.button className="btn-primary" pseudo=":hover">
  background: darkslateblue;
</mixins.button>
```

Immutable mixins support child rulesets, allowing nested styles to be reused among similar rulesets:

```jsx
const mixins = {
  button: createMixin(
    <button>
      padding: 10px;
      border-radius: 3px;
      font-size: 14px;

      <svg className="icon">
        width: 15px;
        height: 15px;
        fill: currentColor;
      </svg>
    </button>
  )
}
```

Styles nested within mixins can be used like any other immutable ruleset:

```jsx
<mixins.button className="btn-primary">
  background: slateblue;

  <svg className="icon">
    color: peachpuff;
  </svg>
</mixins.button>
```

The example above targets elements of type `button` that have the class `btn-primary`. The `svg` within the button recieves four declarations, three from the mixin: `width`, `height`, `fill` and the peachpuff `color` unique to icons within primary buttons.

### Modifier Classes

As with immutable rulesets immutable mixins support modifier classes. Modifier classes allow selectors to explicitly target elements with multiple classes:

```jsx
<mixins.button className="btn.disabled">
  background: slategray;
  opactiy: 0.3;
  pointer-events: none;
</mixins.button>
```

The exampe above targets elements of type `button` that have the classes `btn disabled`.

> 💡Note: you can read more above modifier classes in the [Explicit Selectors]() guide.

### Override Protection

Immutable mixins come with the same override protection as normal immutable rulesets:

```jsx
<mixins.button className="btn-secondary">
  padding: 20px;
</mixins.button>
```

The example above attempts to override the `padding` property defined by the `button` mixin, which throws a compile time error:

*MixinOverrideFound.png*