# Templates

The core template mechanic in Symbiote.js - is a native browser HTML-string parsing via standard DOM API methods. That's the fastest way to create component template instance in object model representation.

### html

We have a `html` helper tag function, that manage to construct templates using compact binding-maps:
```js
import { html } from '@symbiotejs/symbiote';

const myTemplate = html`
  <button ${{onclick: 'onBtnClick'}}>Click me!</button>
`;
```
In this example, we've created the button and connected it to a `onBtnClick` handler function, which should be defined in a component state.

As you can see, every binding-map - is a simple JavaScript object,
that describes connections between the own inner element properties and the component's data. It is a standard JavaScript template literal syntax with no any special additions.

> Note, that in Symbiote.js you can define and describe template outside the component's context (`this`) visibility, this is a clear abstraction. That helps to make manipulations with templates much more flexible than in some other libraries.

### Binding to a text node

Let's see onto the more detailed example:
```js
import Symbiote, { html } from '@symbiotejs/symbiote';

class MyComponent extends Symbiote {

  init$ = {
    name: 'John',
    btnTxt: 'Click me!',
    onBtnClick: () => {
      console.log('Button clicked!');
    },
  }

}

MyComponent.template = html`
  <h1>Hello {{name}}!</h2>
  <button ${{onclick: 'onBtnClick'}}>{{btnTxt}}</button>
`;
```
In this example we have a new type of template bindings to a text nodes, which are defined with a double braces syntax - `{{myProp}}`.

### Binding to nested properties

Symbiote.js allows to bind properties to the nested properties of the elements:
```js
MyComponent.template = html`
  <div ${{'style.color': 'myCssValue'}}>Some text...</div>
`;
```

Also, you can bind your props to the nested component's state directly, using `$`-proxy:
```js
MyComponent.template = html`
  <my-component ${{'$.nestedPropName': 'propName'}}></my-component>
`;
```

### Binding to HTML-attributes

To bind some property to the element's attribute, use `@` prefix:
```js
MyComponent.template = html`
  <div ${{'@hidden': 'isHidden'}}></div>
`;
```

### Type casting

You can transform any type of property value to `boolean` type (`true` or `false`), using `!` symbol.

Inversion example:
```js
html`<div ${{'@hidden': '!innerText'}}> ... </div>`;
```

Double inversion example:
```js
html`<div ${{'@contenteditable': '!!innerText'}}> ... </div>`;
```

## Property Tokens (Property key prefixes)

###  Named context property `/`

To bind something to some named data context property, use the named prefix:
```js
html`<div ${{textContent: 'MY_APP/propName'}}> ... </div>`;
```

###  Shared context property `*`

To share a property with other components in a same usage context, use the shared context token:
```js
html`<div ${{textContent: '*propName'}}> ... </div>`;
```

###  Inherited context property `^`

To get the direct access to some property of the top level component (cascade data model), use the inheritance token:
```js
html`<div ${{textContent: '^propName'}}> ... </div>`;
```

###  CSS Data property `--`

To initiate some property from the CSS Data, you can do as follows:
```js
html`<div ${{textContent: '--prop-name'}}> ... </div>`;
```

> More details about Symbiote-component's context you can find in [**Context**](./2x/docs/Context/) section.

## Slots

[Slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) allow you to define placeholders in your template that can be filled with any external markup fragment.

Default template slot:
```html
<div class="my-wrapper">
  <slot></slot>
</div>
```

Named template slots:
```html
<header>
  <slot name="header"></slot>
</header>
<article>
  <slot name="article"></slot>
</article>
<footer>
  <slot name="footer"></slot>
</footer>
```

## Element references

If you need an element reference somewhere in your code logics, use `ref` attribute for your template element:
```js
html`
  <div>
    <div ${{ref: 'div1'}}></div>
    <div ${{ref: 'div2'}}></div>
  </div>
`;
```
or, to get the same effect:
```js
html`
  <div>
    <div ref="div1"></div>
    <div ref="div2"></div>
  </div>
`;
```

Reference name should be unique for each element (like an element's `id`).
Then you can use `ref` collection to get those elements in your code without any additional DOM search:
```js
class MyComponent extends Symbiote {
  renderCallback() {
    this.ref.div1.contenteditable = true;
    this.ref.div2.style.color = 'red';
  }
}
```

## Dynamic list rendering

To render efficient dynamic reactive list of elements, use the `itemize` API:

```js
class MyComponent extends Symbiote {
  init$ = {
    listData: [
      {
        firstName: 'John',
        secondName: 'Snow',
      },
      {
        firstName: 'Jane',
        secondName: 'Stone',
      },
    ],
  }
}

MyComponent.template = html`
  <h1>My list:</h1>
  <ul ${{itemize: 'listData'}}>
    <li>{{firstName}} {{secondName}}<li>
  </ul>
`;
```

> More information about `itemize` API you can find at the [**List items** section](./2x/docs/List_items/).