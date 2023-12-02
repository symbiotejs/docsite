# Templates

The core template mechanic in Symbiote.js - is a native browser HTML-string parsing via standard DOM API methods. That's the fastest way to create component template instance in object model representation.

## html

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

Let's see onto the more detailed example:
```js
import { BaseComponent, html } from '@symbiotejs/symbiote';

class MyComponent extends BaseComponent {

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

## Binding to a nested property

```js

```

Attribute value syntax based on key/value pairs:
```html
<div 
  bind="textContent: myText; style.color: textColor">
</div>
```
* Keys and values should be separated with `:`
* All key/value pairs should be separated by `;`
* Spaces are optional, you can use them for better readability.
* As you can see, nested properties are supported: `style.color`.
* All keys are native object property names. So, they provide direct access to the DOM API.

### Attributes

To bind some property to the own element's HTML-attribute use `@` prefix:
```html
<div 
  bind="@class: className">
</div>
```

### Contexts
To bind element to some external data context property, use `*` prefix for property name:
```html
<div 
  bind="textContent: *textFromContext">
</div>
```

Also, to bind element to named (abstract) context, use context name as property prefix separated by slash symbol:
```html
<div 
  bind="textContent: profile/name">
</div>
```

**More information about data context you can find in "Data context" section.**

### Handlers

Action handler binding is the same as own property:
```html
<input type="text" bind="oninput: onTextInput" />
```

### Text nodes

Binding to the text nodes is also supported with the same property scheme:
```html
Local component's data:
<div>Hello {{userName}}! Welcome to the {{currentPlace}}!</div>

or common context data:
<div>Hello {{*userName}}!</div>

or data from some named context:
<div>Hello {{profile/name}}!</div>
```

### Type casting

Inversion:
```html
Local property:
<div bind="@hidden: !innerText">{{innerText}}</div>

Common context property:
<div bind="@hidden: !*innerText">{{*innerText}}</div>

Named context property:
<div bind="@hidden: !app/innerText">{{app/innerText}}</div>
```

Cast to boolean:
```html
<div bind="@contenteditable: !!innerText">{{innerText}}</div>
```

## Slots

[Slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) allow you to define placeholders in your template that can be filled with any external markup fragment.

> Symbiote.js make slots available without Shadow DOM usage.

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
```html
<div class="layout">
  <div ref="div1"></div>
  <div ref="div2"></div>
</div>
```
Reference name should be unique for each element (like an element's `id`).
Then you can use `ref` collection to get those elements in your code without any additional search:
```javascript
class MyComponent extends BaseComponent {
  initCallback() {
    this.ref.div1.contenteditable = true;
    this.ref.div2.style.color = 'red';
  }
}
```

## Data based templates

Efficient conditional and data based template rendering is very case specific. In some cases the best solution is to use simple `innerHTML` approach. HTML parsing is very fast in modern browsers and frequently that's the most performant and convenient way:
```javascript
class MyComponent extends BaseComponent {
  init$ = {
    listHtml: '',
  }

  initCallback() {
    this.sub('*list', (/** @type {{uid:string}[]} */ list) => {
      this.$.listHtml = list.reduce((html, item) => {
        return html += html`<list-item uid="${item.uid}"></list-item>`;
      }, '');
    });
  }
}

MyComponent.template = html`
<h2>Items:<h2>
<div class="list-wrapper" bind="innerHTML: listHtml"></div>
`;
```

## Dynamic lists

Symbiote.js is supporting dynamic lists rendering and the performant data reconciliation with an unkeyed approach.
Take a look at the "List rendering" section for more information.