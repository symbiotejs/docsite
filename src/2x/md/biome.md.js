export default /*md*/ `
## Biome

Here we provide a set of the basic recommendations for the development environment setup.
Note, that this is only recommendations, you can chose any other approach which is more
relevant to your experience of needs.

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
import BaseComponent, { html, css } from 'https://cdn.jsdelivr.net/npm/@symbiotejs/symbiote/core/index.js/+esm';

export class MyAppComponent extends BaseComponent {}

export { html, css }
\`\`\`
`;