# Attributes

Like the all other regular DOM-elements, Symbiote-components can have their own HTML-attributes. And like the all standard Custom Element, Symbiote-components can react to dynamic attribute changes.

### Attribute connection

The most simple way to connect some local state property to the actual attribute value is to use the `@`-token:
```js
class MyComponent extends Symbiote {

  init$ = {
    '@attribute-name': 'initial value',
  }

}
```

Or you can initiate this type of property from the component's template directly:
```js
class MyComponent extends Symbiote {}

MyComponent.template = html`<h1>{{@attribute-name}}</h1>`;
```

Then you can use it as an attribute in your markup:
```html
<my-component attribute-name="attribute value"><my-component>
```

Reaction on attribute changes with the property accessor:
```js
class MyComponent extends Symbiote {

  set 'my-attribute'(val) {
    console.log(val);
  }

}

MyComponent.observedAttributes = [
  'my-attribute',
];
```

Also, you can bind attributes to property values directly:
```js
class MyComponent extends Symbiote {

  init$ = {
    myProp: '',
  }

}

// Map the attribute name to corresponding property key:
MyComponent.bindAttributes({
  'my-attribute': 'myProp',
});

// This will render the attribute value as a text node:
MyComponent.template = html`
  <div>{{myProp}}</div>
`;
```

### List of the reserved attribute names

- `bind`
- `ctx`
- `ctx-owner`
- `ref`
- `itemize`
- `item-tag`
- `use-template`
- `skip-text-nodes`
