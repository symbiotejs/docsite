export default /*md*/ `
## What's new?

### 1. New template helper function

We have a \`html\` tag function, which helps to construct HTML templates:
\`\`\`js
import { html } from '@symbiotejs/symbiote';

let mySymbioteTemplate = html\`<div>Hello world!</div>\`;
\`\`\`

More detailed template syntax example:
\`\`\`html
<h1>{{heading}}</h1>

<button \${{onclick: 'onButtonClicked'}}>Click me!</button>

<my-component \${{
  textContent: 'someText',
  'style.border': 'myComponentBorder',
  '$.data': 'someData',
}}></my-component>

<ul \${{list: 'myListData'}}>
  <li>{{listItemName}}</li>
</ul>
\`\`\`

> Now we can use native JavaScript string interpolation and simple objects to map element's attributes, 
properties (including any nested property) to our data models.

### 2. New styling approach and capabilities
Symbiote.js is now support the new cutting edge browser styling technology - [adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets).
It helps to make your work with CSS easy and flexible like never before:
\`\`\`js
import { css } from '@symbiotejs/symbiote';

MyComponent.rootStyles = css\`
my-component {
  display: block;
}
\`;
\`\`\`

### 3. New lifecycle method \`renderCallback\`
### 4. Upper level properties \`^\`
### 5. Computed properties \`+\`
### 6. Virtual components
### 7. Enhanced list rendering
### 8. Runtime type warnings for the state properties
`;