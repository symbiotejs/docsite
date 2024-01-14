export default /*md*/ `
## Biome

Here we provide a set of the basic recommendations for the development environment setup.
Note, that this is only recommendations, you can chose any other approach which is more
relevant to your experience or needs.

### 1. Template syntax highlight

We use standard JavaScript template literals for the component's templates description.
To highlight HTML inside template literals we use IDE extensions, that allows to identify
such templates with tag functions or JavaScript comments. 

Example:
\`\`\`js
let template = html\`<div>MY_TEMPLATE</div>\`;

let styles = css\`
  div {
    color: #f00;
  }
\`;
\`\`\`

### 2. Static analysis, type checking 

We strongly recommend to use TypeScript static analysis in all your projects. 

We use JSDoc format and *.d.ts files for the types declarations.

JSDoc annotation example:
\`\`\`js
/**
 * @param {Boolean} a
 * @param {Number} b
 * @param {String} c
 */

function myFunction(a, b, c) {
  ...
}
\`\`\`
Check the details at [https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

### 3. Building and minification

[Esbuild](https://esbuild.github.io/) - is our choice for the code bundling and minification.
Esbuild is very performant and easy to configure solution that can prepare your JavaScript and
CSS code for the distribution.

### 4. Code sharing
Network imports is a very powerful platform feature that helps to use the common code parts for the
different functional endpoints in the big applications with ease. You don't need to setup complex
build workflows to share the dependencies anymore.

Example:
\`\`\`js
import { Symbiote, html, css } from 'https://esm.run/@symbiotejs/symbiote';

export class MyAppComponent extends Symbiote {}

export { html, css }
\`\`\`

### 4. Local/dev server

Use any local server you like, that can serve static files. Symbiote.js is agnostic and it doesn't 
require any special tool for ESM modules resolving or for the anything else. 

You can use the simple relative paths for your modules or \`import-maps\` for the 
[module path mapping](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap). 

This feature is [supported in all modern browsers](https://caniuse.com/import-maps).
`;