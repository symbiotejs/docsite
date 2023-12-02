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
import { BaseComponent } from 'https://esm.run/@symbiotejs/symbiote';
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
import { BaseComponent } from 'https://esm.run/@symbiotejs/symbiote';

export class AppComponent extends BaseComponent {
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

`my-app.js`:
```js
import { BaseComponent, html, css } from 'https://esm.run/@symbiotejs/symbiote';

export class MyComponent extends BaseComponent {
  init$ = {
    count: 0,
    increment: () => {
      this.$.count++;
    },
  }
}

MyComponent.template = html`
  <h2>{{count}}</h2>
  <button ${{onclick: 'increment'}}>Click me!</button>
`;
```

Create the `my-first-symbiote-try.html`:
```html
<script type="module">

  // Import base class and the html-template helper function:
  import { BaseComponent, html, css } from 'https://symbiotejs.github.io/symbiote.js/core/BaseComponent.js';

  class MyComponent extends BaseComponent {

    // Initiate component's state:
    init$ = {
      count: 0,
      increment: () => {
        this.$.count++;
      },
    }

  }

  // Define reactive template:
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

  // Register your Web Component in the browser with a new tag:
  MyComponent.reg('my-component');

</script>

Insert your tag somewhere in your document:
<my-component></my-component>
```

> To run this example, you'll need a browser and the text editor only. 

## Platform specs & Standards

It's important to know, what are the Web Components in general.
