## External templates

Symbiote.js allows to define or to provide customized templates outside the JavaScript runtime 
as a native `template`-element in the common document structure. 

To enable that feature, use `allowCustomTemplate` property:
```js
class MyComponent extends BaseComponent {

  // Enable external template usage:
  allowCustomTemplate = true;

  init$ = {
    title: 'Title',
    clicks: 0,
    onClick: () => {
      this.$.clicks++;
    },
  };
}

MyComponent.reg('my-component');
```

Provide template element's DOM selector with a `use-template` attribute:
```html
<template id="external-template">
  <h1>{{title}}</h1>
  <div>{{clicks}}</div>
  <button set -onclick="onClick">Click me!</button>
</template>

<my-component use-template="#external-template"></my-component>
```

> That allows you to create components which might be deeply customized by component users 
without writing even a string of JavaScript. All you need is to provide some data context with your initial component.