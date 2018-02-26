## Design Decisions / Tradeoffs

In order to achieve no overrides there are some tradeoffs, some of which may feel unnatural - and the rationale not immediately apparent. Each tradeoff is documented below explaining *what* it is, *why* it exists and the *problem* it solves. It should be noted that tradeoffs are subject to change if and when a better solution is found.

A lot of the design decisions make CSS resilient to changes in HTML. This means changes in HTML (structure/attributes) should not introduce unforeseen overrides.

### Class Selectors

**What:** All classes are matched via *exact* attribute selectors `[class=className]`.

**Why:** To prevent overrides when an element uses multiple classes containing competing styles.

**Problem:**

```html
<p class="foo">...</p>
<p class="bar">...</p>
```

```css
p.foo {
 color: black;
}

p.bar {
 color: red;
}
```

We cannot guarantee the color of `p.foo` will always be `black`. The current example assumes paragraphs will never use both classes `foo bar`. Override introduced when both classes are used:

```html
<p class="foo bar">...</p>
```

**Solution:** Immutable Styles treats `foo` and `bar` as distinct values - the generated CSS for this example is:

```css
p[class="foo"] {
 color: black;
}

p[class="bar"] {
 color: red;
}
```

### Child Selectors

**What:** All child nodes are matched via *direct* child selectors `A < B`.

**Why:** The structure of HTML is unknown. Prevent overrides when nested HTML structures contain competing styles.

**Problem:**

```html
<div>
 <p>...</p>
</div>

<section>
 <p>...</p>
</section>
```

```css
div p {
 color: black;
}

section p {
 color: red
}
```

We cannot guarantee the color of `p.foo` will always be `black`. The current example assumes paragraphs are only nested within `div` **or** `section`. Override introduced when a paragraph is nested within `div` **and** `section`:

```diff
<div>
 <p>...</p>
+ <section>
+  <p>...</p>
+ </section>
</div>
```

**Solution:** Immutable Styles treats all child nodes as direct children - the generated CSS for this example is:

```css
div:not([class]) > p:not([class]) {
 color: black;
}
section:not([class]) > p:not([class]) {
 color: red;
}
```

### Element Equality

**What:** Element != element (of same type) with a class. For example `span` and `span.icon` are treated disparate despite sharing the same HTML tag. This means styles applied to `span` are not applied to `span.icon`.

**Why:** If elements (of same type) were treated equally overrides *could* go undetected. Cannot determine what class(es) an element has/will have in HTML.

**Problem:**

```html
<p class="foo">...</p>

<div class="bar">
 <p>...</p>
</div>
```

```css
p.foo {
 color: black;
}

div.bar p {
 color: red;
}
```

We cannot guarantee the color of `p.foo` will always be `black`. The current example assumes paragraphs within `div.bar` will never use the class `foo`. Override introduced when the class `foo` is added:

```diff
<div class="bar">
- <p>...</p>
+ <p class="foo">...</p>
</div>
```

**Solution:** Immutable Styles treats `p` and `p.foo` differently - the generated CSS for this example is:

```css
p[class="foo"] {
 color: black;
}

div[class="bar"] > p:not([class]) {
 color: red;
}
```

### No ID Selectors

**What:** Styles cannot be applied using ID selectors. Styles can only be applied using *element* type or class selectors.

**Why:** ID selectors *could* sidestep override detection.

**Problem:**

```html
<p class="foo">...</p>
<p id="bar">...</p>
```

```css
p.foo {
 color: black;
}

p#bar {
 color: red;
}
```

We cannot guarantee the color of `p.foo` will always be `black`. The current example assumes paragraphs only have the class `.foo` **or** the ID `#bar`. Override introduced when paragraph has the class `.foo` **and** the ID `#bar`:

```diff
<p class="foo">...</p>
+<p class="foo" id="bar">...</p>
```

**Solution:** Immutable Styles does not support ID selectors.

### No Property Inheritance

**What:** Inheritable properties cannot be used by parent elements. They can only be set by the elements that use them.

**Why:** Cannot determine if an inherited style is overridden.

**Problem:**

```html
<div class="foo">...</div>
```

```css
div.foo {
 color: black;
}

p.bar {
 color: red;
}
```

We cannot guarantee the color of elements within `div.foo` will always be `black`. Override introduced when paragraph has the class `.foo` **and** the ID `#bar`:

```diff
<div class="bar">
+ <p class="foo">...</p>
</div>
```

**Solution:** Immutable Styles counters this by not supporting inheritable properties.

### Discrete Media Queries

**What:** Styles in one media query cannot override styles in another media query.

**Why:** To prevent overrides among media queries. Media queries should not rely on cascade/specificity to produce their expected behaviour.

**Problem:**

```css
@media (min-width:300px) {
 p {
  color: black;
 }
}

@media (min-width:900px) {
 p {
  color: red;
 }
}
```

We cannot guarantee the color of `p.foo` on screens wider than `300px` will always be `black`. The first media query is only effective until an implied max-width of 899px. On screens wider than `900px` the color of `p.foo` is overriden to `red`.

**Solution:** Media queries containing competing styles should use discrete breakpoints to encapsulate styles (and thus prevent overrides):

```diff
+@media (min-width:300px) and (max-width:899px) {
 p {
  color: black;
 }
}

@media (min-width:900px) {
 p {
  color: red;
 }
}
```