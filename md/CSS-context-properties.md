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

You can create your own CSS context properties with the following approaches:
```javascript
import { BaseComponent } from '@symbiotejs/symbiote';

class MyComponent extends BaseComponent {

  init$ = {
    text: 'TEXT',
  }

  initCallback() {
    // Use "getCssData" method to get the actual values:
    this.$.text = this.getCssData('--my-configuration-property');
  }

}
MyComponent.reg('my-component');


/////////////////////////////////


class MyOtherComponent extends BaseComponent {

  initCallback() {
    // This will create "--my-configuration-property" in external data context and pass the initial value:
    this.bindCssData('--my-configuration-property');
  }

  onclick = () => {
    // By default, CSS context property will be connected to external context, so you need to use "*" prefix to access it:
    this.$['*--my-configuration-property'] = 'Property is changed!';
  }

}
MyOtherComponent.reg('my-other-component');
```

Of course, you need to provide the initial property value in CSS, somewhere in your document:
```css
body {
  --my-configuration-property: 'SOME VALUE';
}
```

This helps to create and provide complex configurations for application components, widgets and micro-frontends with ease.