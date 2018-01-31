**Dev dependencies:**

```
yarn add babel-register --dev
yarn add babel-plugin-transform-react-jsx --dev
yarn add glob --dev
yarn add jest --dev
```

**Tests:**

Add following to `package.json`:

```
"scripts": {
  "test": "jest"
}
```

Run tests with: `npm test`

**Todos:**

- Add docs
  - Gotchas / caveats:
    - child nodes use child combinator selector (<)
    - element != element with class
    - cannot use IDs for styling
