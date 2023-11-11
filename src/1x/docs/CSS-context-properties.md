```json
{
  "title": "Symbiote.js | CSS context properties"
}
```
## CSS context properties

CSS context properties - one of the core concepts used in Symbiote.js. It's very simple and powerful.

We have a browser-native ability for providing some abstract context down to the DOM cascade. 
This is a [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). They could have any custom values and they are accessible inside the nested shadow roots (if you use them), unlike the other CSS properties. The main purpose of this, is to provide values for element styling. But it could be used for providing some application data values also.

By default, Symbiote.js using CSS context properties approach for defining common data-channels and context building. 

Technically, it looks like this:
```html
<my-component ctx-name="context-name"><my-component>
  ...
<my-other-component ctx-name="context-name"><my-other-component>
```
And now, this two components are connected for common data usage.

Code from above will be rendered as:
```html
<my-component ctx-name="context-name" style="--ctx-name: context-name;">...<my-component>
  ...
<my-other-component ctx-name="context-name" style="--ctx-name: context-name;">...<my-other-component>
```

So, any nested component has a data-channel name provided, which can be accessed via native DOM API `getComputedStyle` method. It will be used at data-context initialization stage. 

You can create your own CSS context properties with the following simple approach:
```javascript
import { BaseComponent } from '@symbiotejs/symbiote';

class MyComponent extends BaseComponent {

  // Initialize CSS context property binding and it's possible initial value:
  cssInit$ = {
    '--text': 'INITIAL TEXT',
  }
  // That property will act like other Symbiote context properties, but will be updated from the document CSS or by the Element.style interface call

}
MyComponent.template = /*html*/ `
  <div>{{--text}}</div>
`;
MyComponent.reg('my-component');

///////////

// Note, that CSS context properties are parsing via JSON.parse method, so, you need to use additional quotes for the text values:
document.body.style.setProperty('--text', '"MY CSS TEXT"');
// That will cause the dynamic update for the Symbiote component.
```

For the initial state creation, use CSS:
```css
:root {
  --text: 'INITIAL TEXT FROM DOCUMENT CSS';
}
```

CSS values could be nested or inherited just like the other CSS rules according to their specificity:
```css
:root {
  --text: 'INITIAL TEXT FROM DOCUMENT CSS';
}

my-component {
  --text: 'TEXT FOR THE CERTAIN COMPONENT TYPE';
}

.my-rules {
  --text: "SOME TEXT BASED ON ELEMENT'S CLASS";
}
```

> There are two basic types of data supported:
1. Strings (should be taken in quotes)
2. Numbers (as is)

To implement a flag property, use numbers (instead of `true`/`false`):
```css
my-component {
  --app-settings-flag: 1;
}
```
or
```css
my-component {
  --app-settings-flag: 0;
}
```

Then you can read those flags in your application. 

In the following example, you can see the CSS context property binding to the elements attribute and the type casting (to `Boolean`) for it:
```js
import { BaseComponent } from '@symbiotejs/symbiote';

class MyComponent extends BaseComponent {

  cssInit$ = {
    '--text': 'INITIAL TEXT',
    '--hidden': 0,
  }

}
MyComponent.template = /*html*/ `
  <div set="@hidden: !!--hidden">{{--text}}</div>
`;
MyComponent.reg('my-component');
```

This helps to create and provide complex configurations for application components, widgets and micro-frontends with ease.