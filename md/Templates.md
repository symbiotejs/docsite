## Template syntax

One of the core template mechanics in Symbiote.js - is a native browser HTML parsing via standard DOM API methods. That's the fastest way to create component template instance in object model representation. It might be quite counterintuitive, but in modern browsers `innerHTML` works faster, than imperative elements structure creation with `document.createElement`.
That's why we use custom tag attribute `set` to describe template data bindings.

Attribute value syntax based on key/value pairs:
```html
<div 
  set="textContent: myText; style.color: textColor">
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
  set="@class: className">
</div>
```

### Contexts
To bind element to some external data context property, use `*` prefix for property name:
```html
<div 
  set="textContent: *textFromContext">
</div>
```

Also, to bind element to named (abstract) context, use context name as property prefix separated by slash symbol:
```html
<div 
  set="textContent: profile/name">
</div>
```

**More information about data context you can find in "Data context" section.**

### Handlers

Action handler binding is the same as own property:
```html
<input type="text" set="oninput: onTextInput" />
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
<div set="@hidden: !innerText">{{innerText}}</div>

Common context property:
<div set="@hidden: !*innerText">{{*innerText}}</div>

Named context property:
<div set="@hidden: !app/innerText">{{app/innerText}}</div>
```

Cast to boolean:
```html
<div set="@contenteditable: !!innerText">{{innerText}}</div>
```

## Alternate binding description syntax

As it was mentioned before, Symbiote.js using HTML-templates which are can be processed by 
the browser "as is", without any pre-processing. That allows to process templates with a native DOM API
in that moment, when we need it. Also we can generate such templates with any frontend or backend tool
able to generate HTML. That's why we using syntax based on what native browser parser allows us to do.

It is possible to use separate attributes do describe data bindings:
```html
<h1 set
  -text-content="title"
  -@class="titleClassName">
</h1>

<button set
  -onclick="onButtonClick">
</button>

<div set
  -inner_html="contentHtml">
</div>
```
In case of using separate attributes you need to use a `set` attribute to initiate element's attributes processing.
As you can see in provided example, binding attributes should be prefixed with `-` symbol and transformed 
into the kebab-case (`textContent` becomes `-text-content`). For the element properties containing upper-case 
parts, such as `innerHTML`, you can use snake-case (`innerHTML` becomes `-inner_html`). 
That's because native HTML-attributes are not case sensitive and you cannot use direct property names in HTML.

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
        return html += /*html*/ `<list-item uid="${item.uid}"></list-item>`;
      }, '');
    });
  }
}

MyComponent.template = /*html*/ `
<h2>Items:<h2>
<div class="list-wrapper" set="innerHTML: listHtml"></div>
`;
```

## Dynamic lists

Symbiote.js is supporting dynamic lists rendering and the performant data reconciliation with an unkeyed approach.
Take a look at the "List rendering" section for more information.