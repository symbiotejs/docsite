# Get started

### NPM installation

```shell
npm i @symbiotejs/symbiote
```

> Note, that if you are using CDN module sharing approach, you should add package to a `devDependencies` section, because it will be used for the code static analysis only (TypeScript and "Go to Definition" support).

Installation as a `dev` dependency:
```shell
npm install @symbiotejs/symbiote --save-dev
```

### HTTPS/CDN

To easily share Symbiote.js as a common dependency between independent application parts (widgets, micro-frontends, meta-applications), you can use one of the modern code CDNs:
```js
import { Symbiote } from 'https://esm.run/@symbiotejs/symbiote';
```

TypeScript support (my-types.d.ts):
```ts
// List out all your dependencies. 
// For every URL, you must map it to its local module:

declare module 'https://esm.run/@symbiotejs/symbiote' {
  export * from '@symbiotejs/symbiote';
}
```
In some cases, you will need to add `maxNodeModuleJsDepth` setting to your `tsconfig.json` file:
```json
{
  "compilerOptions": {
    "allowJs": true,
    "maxNodeModuleJsDepth": 2
  }
}
```

Also, you can publish your own Symbiote.js build as a regular static file to your own server and to use it via HTTPS. The ability to use HTTPS-imports is supported in all modern browsers.

It's convenient to define the common base class for your application to have ability to manage HTTPS dependency in one place and to have an endpoint for any app-level extensions:

```js
import { Symbiote } from 'https://esm.run/@symbiotejs/symbiote';

export class AppComponent extends Symbiote {
  // Your code...
}
```

### Git submodule (optional)

Initial submodule connection:

```shell
git submodule add -b main https://github.com/symbiotejs/symbiote.js.git ./symbiote
```

Activation at the cloned host repository and getting updates: 

```shell
git submodule update --init --recursive --remote
```

Switch to the certain revision:

```shell
cd symbiote && git checkout <VERSION_TAG>
```

`package.json` scripts section example:
```json
{
  "scripts": {
    "git-modules": "git submodule update --init --recursive --remote",
    "sym-version": "cd symbiote && git checkout <VERSION_TAG> && cd ..",
    "setup": "npm run git-modules && npm run sym-version && npm i"
  }
}
```

Then:
```shell
npm run setup
```

## Your first Symbiote-component

Create the HTML file `my-app.html`:
```html
<script type="importmap">
  {
    "imports": {
      "@symbiotejs/symbiote": "https://esm.run/@symbiotejs/symbiote"
    }
  }
</script>

<script type="module">
  import Symbiote, { html, css } from '@symbiotejs/symbiote';

  export class MyComponent extends Symbiote {

    // Initiate state:
    init$ = {
      count: 0,
      increment: () => {
        this.$.count++;
      },
    }

  }

  // Define template:
  MyComponent.template = html`
    <h2>{{count}}</h2>
    <button ${{onclick: 'increment'}}>Click me!</button>
  `;

  // Describe styles:
  MyComponent.rootStyles = css`
    my-component {
      color: #f00;
    }
  `;

  // Register the new HTML-tag in browser:
  MyComponent.reg('my-component');
</script>

<my-component></my-component>
```

That's it! Open this HTML file in your browser and check the result.

> To run this example, you'll need a browser and the text editor only. No any installation, build setup or local server is required in this case.

## Platform specs & Standards

It's important to know, what are the Web Components in general. Here we provide some links to the useful platform documentation (MDN):
- [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
- [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
- [Templates and slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots)
- [Constructable Stylesheets](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [ECMAScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [Import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)
