```json
{
  "title": "Symbiote.js | Styling"
}
```
## Styling

By default, Symbiote-components are don't have a [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) enabled, so they could be styled classic way, with the convenient selectors based on custom tag names:

```css
my-tag {
  color: red;
}
my-tag > .heading {
  font-size: 2em;
}
```

It's recommended to use only one top level shadow root (wrapper) for your application, if you planning to create some kind of embeddable solution:

```js
class MyWrapper extends BaseComponent {}

MyWrapper.template = /*html*/ `
  <h2>Heading...</h2>
  <my-tag></my-tag>
`;

// This will enable Shadow DOM and connect styles for it:
MyWrapper.shadowStyles = /*css*/ `
  :host {
    color: blue;
  }
  my-tag {
    color: red;
  }
`;
```

Note that in this case, render function will be called asynchronously. It caused by connecting styles via [Blob URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) and we should wait a bit for a resource loading even if nothing is loaded from the network. 

For the [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) support, in that case, you should add the `blob:` source to your settings.

If you don't use CSP settings and don't care about `style` element repeating in component instances, you can use simple inline styles for the shadow root in your template:

```javascript
class MyWrapper extends BaseComponent {
  // Don't forget to enable Shadow DOM manually:
  renderShadow = true;
}

MyWrapper.template = /*html*/ `
  <style>
    :host {
      color: blue;
    }
    my-tag {
      color: red;
    }
  </style>
  <h2>Heading...</h2>
  <my-tag></my-tag>
`;
```

More information about Shadow DOM styling and it's selectors, you can find [here](https://developer.mozilla.org/en-US/docs/Web/CSS/:host()).

### Root styling

```js
class MyComponent extends BaseComponent {}

MyComponent.template = /*html*/ `
  <h2>Heading...</h2>
  <my-tag></my-tag>
`;

// This will enable Shadow DOM and connect styles for it:
MyComponent.rootStyles = /*css*/ `
  my-component {
    color: blue;
  }
  my-tag {
    color: red;
  }
`;

MyComponent.reg('my-component');
```


