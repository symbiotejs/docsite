# Styling

Symbiote.js 2.x utilizes the new [CSSStyleSheet API](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet), which is allow efficient manipulations with styles in memory. It works very similar to the styles of the embedded browser elements, such as inputs or video tags, but you can fully control it by yourself. 

Also, this API helps to parse CSS rules in JavaScript environment without Content Security Policies (CSP) violation in common.

This technology is supported in all actual versions of modern browsers, but for the older browser support you will need a [polyfill](https://www.npmjs.com/package/construct-style-sheets-polyfill).

Anyway, you can style your components, using any other styling approach which is more convenient for you without any limitations. Or you can combine them. Symbiote components are support regular stylesheets for the Document or Shadow Roots.

Every Symbiote-component has a two major interfaces to set styles:
- `rootStyles`
- `shadowStyles`

Also, th Symbiote package provides an `css` utility function, to process CSS form the template literals:
```js
import { css } from '@symbiotejs/symbiote';
```

With `css` you can provide some additional CSS-processing:

```js
import { css } from '@symbiotejs/symbiote';

// This processing function will be called only once:
css.useProcessor((cssText) => {
  return cssText.replaceAll('red', 'green');
});

let styles = css`
  h1 {
    color: red;
  }
`;
```

Or, you can add the processing sequence of any length:
```js
class MyComponent extends Symbiote {}

let randomTag = 'tag-' + Math.round(Math.random() * Date.now());

MyComponent.reg(randomTag);

css.useProcessor(
  (cssText) => {
    return cssText.replaceAll(' blue;', ' green;');
  },
  (cssText) => {
    return cssText.replaceAll('random-tag', randomTag);
  }
);

MyComponent.rootStyles = css`
  random-tag {
    background-color: blue;
  }
`;
```
In this example, we've created the protected randomized tag name and the styles for it.

### rootStyles

This will create and add a style sheet via `adoptedStylesheets` property to the first found root in document, if it have some Shadow DOM structure or to the document itself.

Example:
```js
class MyComponent extends Symbiote {}

MyComponent.rootStyles = css`
  my-component {
    color: red;
  }
`;

MyComponent.reg('my-component');
```

### shadowStyles

This will create and add a style sheet to the component's Shadow Root. If it doesn't exists, it will be created automatically.

Example:
```js
class MyComponent extends Symbiote {}

MyComponent.shadowStyles = css`
  :host {
    color: red;
  }
`;

MyComponent.reg('my-component');
```

> You can combine the styles for the shadow scope with the style definitions in the external scope for the maximum control.
