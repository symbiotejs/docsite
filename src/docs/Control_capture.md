## Control capture

Symbiote-component is able to take control on it's direct DOM children, even they are not a part of component's template. That is very powerful mechanics, which is helpful to implement things like SSR and many of others. Let's clarify how it works.

```javascript
import {BaseComponent} from '@symbiotejs/symbiote';

class ControlCapture extends BaseComponent {

  // Enable inner HTML processing:
  processInnerHtml = true;

  init$ = {
    text: 'TEXT',
  }
}
ControlCapture.reg('control-capture');
```

In HTML code:
```html
<control-capture>
  <div>{{text}}</div>
</control-capture>
```
In this case, component's inner markup acts like it's template, without unnecessary DOM elements creation in JS runtime. Very simple.

### SSR

For the SSR purposes, it's might be important to set the more representative initial state of document:
```html
<control-capture>
  <div set="textContent: text">TEXT</div>
</control-capture>
```

### Activation

To avoid "blinking" effect and unnecessary redraws, when you using the text node bindings, you can set the initial invisibility for the document subtree, which you planning to control:

```html
<control-capture hidden>
  <div>{{text}}</div>
</control-capture>
```

In your component code:
```javascript
import {BaseComponent} from '@symbiotejs/symbiote';

class ControlCapture extends BaseComponent {

  processInnerHtml = true;

  init$ = {
    text: 'TEXT',
  }

  initCallback() {
    // Everything is initialized and all changes are applied
    this.removeAttribute('hidden');
  }
}
ControlCapture.reg('control-capture');
```

### Shadow DOM

It's possible to combine control capture approach with the Shadow DOM features:
```javascript
import {BaseComponent} from '@symbiotejs/symbiote';

class ControlCapture extends BaseComponent {

  // Enable shadow root:
  renderShadow = true;

  // Enable inner HTML processing:
  processInnerHtml = true;

  init$ = {
    text: 'TEXT',
  }
}
ControlCapture.template = /*html*/ `<slot></slot>`;

ControlCapture.reg('control-capture');
```
