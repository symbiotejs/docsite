# Flags

Flags are the set of settings which are enabling or disabling some features or behavior. 

Here is the complete list of them:
- `renderShadow`
- `ssrMode`
- `isVirtual`
- `allowCustomTemplate`
- `pauseRender`
- `processInnerHtml`
- `readyToDestroy`
- `ctxOwner`

### renderShadow

Enables Shadow DOM mode for the component. If enabled, you can use standard slots in your templates and `:host` selectors in your styles. By default, Symbiote-components don't use Shadow DOM.

Example: 
```js
class MyComponent extends Symbiote {

  renderShadow = true; // Default is 'false'

}
```

### ssrMode

Enables Control Capture workflow, that means, that the component will use the own nested markup as a template. This markup could be provided by server as a part of the regular HTML. 

Texts (`textContent`) and attribute bindings will be activated on first update, and will not be changed at the component's state initialization.

Example: 
```js
class MyComponent extends Symbiote {

  ssrMode = true; // Default is 'false'

}
```

Live example: https://symbiotejs.org/2x/playground/ssr-hydration/

### isVirtual

Enables workflow, when component will render its own template only, without the wrapping Custom Element. In this case, Custom Element will be used as a placeholder only and disappear after initial rendering. All data bindings will continue to work just in memory.

Example: 
```js
class MyComponent extends Symbiote {

  isVirtual = true; // Default is 'false'

}
```

### allowCustomTemplate

Enables behavior, when the component's template will be taken from the accessible part of common document by the provided selector.

Example: 
```js
class MyComponent extends Symbiote {

  allowCustomTemplate = true; // Default is 'false'

  // ...
}
```

Then you can use the `use-template` attribute to connect some external template to your component:
```html

<template id="my-tpl">
  <h1>{{someHeading}}</h1>
</template>

<my-component use-template="template#my-tpl"><my-component>
```

### pauseRender

This will disable default render stage to make possible to use some additional logic before. Then, the `render()` function can be called manually.

Example: 
```js
class MyComponent extends Symbiote {

  pauseRender = true; // Default is 'false'

  initCallback() {
    fetch('../my-data.json').then((response) => {
      response.json().then((data) => {
        this.set$(data);
        this.render();
      });
    });
  }

}
```

### processInnerHtml

This is work quite similar as `ssrMode`, but all initiated data will be rendered immediately. So, in this case, you can use the standard template bindings syntax for the text nodes: `{{myProp}}`.

Example: 
```js
class MyComponent extends Symbiote {

  processInnerHtml = true; // Default is 'false'

  // ...
}
```

HTML example:
```html
<my-component>
  <h1>{{someHeading}}</h1>
</my-component>
```

### readyToDestroy

This will **disable** the default destruction workflow (memory cleanup) in cases, when your component is removed from the DOM and you have no plans to put it back. If this flag enabled, component will not be destroyed.

Example: 
```js
class MyComponent extends Symbiote {

  readyToDestroy = false // Default is 'true'

}
```

### ctxOwner

This will help you to control shared context in cases, when some components in the same context are removed or added.

Example: 
```js
class MyComponent extends Symbiote {

  ctxOwner = true; // Default is 'false'

}
```

This also could be set with a `ctx-owner` HTML-attribute:
```html
<my-component ctx-owner></my-component>
```