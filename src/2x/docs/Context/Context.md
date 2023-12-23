# Context

Usage context - is the one of the central things in Symbiote.js. Every Symbiote-component is able to analyze it's environment, read external settings from the actual position in DOM and to provide data to the related components. Symbiote.js is utilizing the DOM structure as a basic entity for the data flow management and interconnection.

Component context is a sum of the all accessible data sources. Each source represents it's own type of possible interaction. Let's have a look at them.

### Local context

Local context properties - is a most habitual and well known part of the component's data context. It works the same way, as a component state at most of other libraries.

Here is an example:
```js
class MyComponent extends Symbiote {

  init$ = {
    myProperty: 'some value',
  }

}
```
In this code, we've initialized the local property named `myProperty`. Now we can use it in templates or in the component logic:
```js
class MyComponent extends Symbiote {

  // Use the init$ map to define properties and the initial values:
  init$ = {
    myProperty: 'some value',
  }

  renderCallback() {
    // Use the $ Proxy to read the value:
    console.log(this.$.myProperty); // > 'some value'

    // Use the $ Proxy to set a new value:
    this.$.myProperty = 'new value';
  }

}

MyComponent.template = html`
  <h1>{{myProperty}}</h1>
`;
```
As you can see, everything is quite simple.

### Named context

Named context is an external abstract data source that can be used by it's name. It can contain any application data or be used for the some dedicated purpose. 

Let's see how it works. In this example, we use named context as a simple localization tool:
```js
import Symbiote, { html, PubSub } from '@symbiotejs/symbiote';

// Create localization map for the English language:
let EN = {
  users: 'Users',
  comments: 'Comments',
  likes: 'Likes',
};

// Create localization context and set the default locale:
let l10nCtx = PubSub.registerCtx(EN, 'L10N');

// Then, you can use localized strings in your components and templates:
class MyComponent extends Symbiote { ... }

MyComponent.template = html`
  <div>{{L10N/users}} - {{numberOfUsers}}</div>
  <div>{{L10N/comments}} - {{numberOfComments}}</div>
  <div>{{L10N/likes}} - {{numberOfLikes}}</div>
`;
```
As you can see, you can use your named context key (`L10N`) to get access to all it's properties. Use `/` token to create named prefixes, for example: `L10N/users`.

Now let's switch the application language:
```js
// Create localization map for the Spanish language:
let ES = {
  users: 'Usuarios',
  comments: 'Comentarios',
  likes: 'Gustos',
};

// And apply the changes:
l10nCtx.multiPub(ES);
```
That's it! Now your application is translated to Spanish.

Of corse you can read and modify named context properties, using the same `$`-proxy:
```js
class MyComponent extends Symbiote { 
  renderCallback() {
    // Read:
    console.log(this.$['L10N/users']);

    // Modify:
    this.$['L10N/users'] = 'ユーザー';
  }
}
``` 

### Inherited context

Property inheritance is a very powerful mechanics that help to control interactions of the components, regarding of their DOM position and hierarchy. It works very similar to the CSS properties cascade model.

Use the `^` property token to point on some higher level property key:
```js
class MyComponent extends Symbiote {}

MyComponent.template = html`
  <button ${{onclick: '^onButtonClicked'}}>Click me!</button>
`;
```
In this example, Symbiote will go up to DOM-tree until it will find the component with `onButtonClicked` handler defined.

This is very useful, for the composition, customization and the responsibility splitting purposes. It helps to write significantly less code in many cases. 

For example, you can define functionality of the each certain component usage, just composing inner structure on HTML-level:
```js
html`
  <my-text-editor>
    <complete-toolbar></complete-toolbar>
  </my-text-editor>
`;
```
Or:
```js
html`
  <my-text-editor>
    <simplified-toolbar></simplified-toolbar>
    <symbol-counter></symbol-counter>
  </my-text-editor>
`;
```

> Note, that like in regular CSS, inherited properties are not have a collision or intersection guard, so it's better to use additional property prefixes in case of not well known or controlled environment.

### Shared context

Shared context works very similar to native HTML radio inputs - `<input type="radio">`. You can set the `name` attribute, and it will connect different inputs into one workflow - you will be able to select only one option in group and all inputs will "know" what happens with others.

To connect Symbiote property to the group of components, you can use `*` token:
```js
class MyComponent extends Symbiote {}

MyComponent.template = html`
  <button ${{onclick: '*onButtonClicked'}}>Click me!</button>
`;
```
If you using `*`-token for some property, shared context will be created automatically. All properties, defined in the same shared context, will be added to the same scope.

For the manual creation of the shared context for the component, use `ctx` HTML-attribute:
```html
<my-component ctx="my_ctx_name"></my-component>

<my-other-component ctx="my_ctx_name"></my-other-component>
```
Thees two components now can share their data between each other. 

Shared property could be initialized and used in any component in the one shared context:
```js
class MyComponent extends Symbiote {

  init$ = {
    '*myProperty1': 'some value',
  }

  renderCallback() {
    console.log(this.$['*myProperty2']); // > 'some other value'
  }

}

class MyOtherComponent extends Symbiote {

  init$ = {
    '*myProperty2': 'some other value',
  }

  renderCallback() {
    console.log(this.$['*myProperty1']); // > 'some value'
  }

}
```

In some cases, when components can be dynamically added or removed from DOM, you will need to set the mein component instance to control shared context. Use the `ctx-owner` attribute for this purpose:
```html
<my-component ctx="my_ctx_name" ctx-owner></my-component>

<my-other-component ctx="my_ctx_name"></my-other-component>
```
This will prevent an excess property reinitialization or value change.

### CSS Data context

Symbiote-component has the ability to initiate it's properties from the CSS custom property values. For example, you have some CSS file, connected to the document:
```css
:root {
  --header: 'CSS Data';
  --text: 'Hello!';
}
```
> CSS custom property values should be valid JSON values, that can be parsed with a native `JSON.parse()` method. We recommend to use numbers for the boolean flags (`0`/`1`).

You can use those CSS values in your templates directly:
```js
class TestApp extends Symbiote {}

TestApp.template = html`
  <h1>{{--header}}</h1>
  <div>{{--text}}</div>
`;
```

> Note, that CSS custom properties will be use for the value initialization only, and then they will act like the normal properties from the local component context.

Yes, it might look strange, to use CSS as a data source for the first time, but we believe it is a quite cool solution to use this approach for configurations. Let's clarify why.

- We have a browser-native ability for providing some abstract context down to the DOM cascade. This is a CSS custom property. They could have any custom values and are accessible inside the nested shadow roots (if you use them), unlike the other CSS properties.
- So we have a cheap, performant, and native way to get some simple data values at any level of the DOM tree. Also, we have a convenient ability to redefine some values at any level if needed. It just works; we don't need to write some new js-library to support that process.
- And that is pretty convenient from the developer experience perspective. You can use simple standard APIs or just a native style or class HTML attributes to define or redefine some contexts. That works with any external framework, library, or meta-platform you want to use.
- If you care about your application security, it's important to have CSP settings for your web documents. So you can't use inline scripts in your markup with more classic-style configurations anymore. That means that you need to bundle them into your code (use only one possible type and version of settings) or create another javascript file with a dedicated flow for loading sequence and caching in that case. The CSS Data alternative approach making that easier.
