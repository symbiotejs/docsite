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

**Symbiote.js** now support the new, cutting edge, browser styling technology - **[adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets)**.
It helps to style your web-components as easy and flexible like never before:
\`\`\`js
import { css } from '@symbiotejs/symbiote';

// External component styles are set in higher level CSS root (document or shadow):
MyComponent.rootStyles = css\`
  my-component {
    border: 1px solid currentColor;
  }
\`;

// Styles for component's Shadow DOM (optional):
MyComponent.shadowStyles = css\`
  :host {
    display: block;
    padding: 10px;
    color: #f00;
  }
\`;

\`\`\`

**rootStyles** and **shadowStyles** could be used separately and together as well. 
Or you can use any other styling approach you familiar with. 

> Important notice: **adoptedStyleSheets** interface does not conflict with **[CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)** (Content Security Policy) in common,
so its safe to use CSS definitions in JavaScript directly.

### 3. New lifecycle method \`renderCallback\`
If you need to interact with some DOM elements, created by Symbiote component, you need a 
reliable way to know when those elements are ready. In case of postponed rendering defined in some parent class, that 
was a messy thing sometimes. Now we have a simple dedicated **renderCallback** lifecycle method for that.


### 4. Upper level properties \`^\`
One of the unique features of Symbiote.js is ability to lay on DOM structure for component 
behavior definition. 

Now we can bind our handlers and properties to upper component's state directly 
and use cascade data model in your application:
\`\`\`js
MyComponent.template = html\`
  <button \${{onclick: '^upperLevelClickHandler'}}>Click me!</button>
\`;
\`\`\`
This example will find the first upper-level component's state, where "upperLevelClickHandler" is defined.

It helps to significantly simplify a lot of complicated interaction cases and to write less code.

> Summary: use the \`^\` property token to get access to upper level properties.

### 5. Computed properties \`+\`
In Symbiote.js 2.x you can define computed properties which are calculated  
on any other local property change:
\`\`\`js
class MyComponent extends BaseComponent {

  init$ = {
    a: 1,
    b: 1,
    '+sum': () => this.$.a + this.$.b;
  }

}

MyComponent.template = html\`<div>{{+sum}}</div>\`;
\`\`\`
Property calculation flow is optimized and won't be invoked while all other changes made in synchronous cycle will not be complete.

> Summary: use the \`+\` property prefix to define computed properties.

### 6. Virtual components
\`\`\`js
class MyComponent extends BaseComponent {

  isVirtual = true;

}
\`\`\`
When **isVirtual** flag is enabled, your component will be rendered as a part of DOM
without any wrapping Custom Element in structure. In this case, component's custom tag will be 
used as a placeholder only, and will be removed at rendering stage. 

### 7. Enhanced list rendering
Built-in list rendering is now support any kind of reactive web-components, not the Symbiote-components
only. That helps to achieve maximum performance in that cases, when it is very important, for 
example, in big dynamic tables. Here is an example:
\`\`\`js
// Create lightweight web-component for each table row:
class TableRow extends HTMLElement {

  set rowData(data) {
    data.forEach((cellContent, idx) => {
      if (!this.children[idx]) {
        this.appendChild(document.createElement('td'));
      }
      this.children[idx].textContent = cellContent;
    });
  }

}

window.customElements.define('table-row', TableRow);

// Than render big dynamic table with Symbiote:
class MyTable extends BaseComponent {

  init$ = {
    tableData: [],
  }

  initCallback() {
    window.setInterval(() => {
      let data = [];
      for (let i = 0; i < 10000; i++) {
        let rowData = [
          i + 1,
          Date.now(),
        ];
        
        data.push({rowData});
      }
      this.$.tableData = data;
      
    }, 1000);
  }

}

MyTable.rootStyles = css\`
  table-row {
    display: table-row;
  }
  td {
    border: 1px solid currentColor;
  }
\`;

MyTable.template = html\`
  <h1>Hello table!</h1>
  <table \${{list: 'tableData', 'list-item-tag': 'table-row'}}></table>
\`;

MyTable.reg('my-table');
\`\`\`
In this example we made a performant dynamic table of 20000 reactive cells.

### 8. Alternative binding syntax is removed
We've removed the alternative binding description support because it required an excess 
property name transformations, which are not obvious for the developers sometimes. 

This is not working anymore:
\`\`\`html
<button set -onclick="onButtonClicked"></button>
\`\`\`
Use the new tag function helper instead:
\`\`\`html
<button \${{onclick: 'onButtonClicked'}}></button>
\`\`\`

### 9. Runtime type warnings for the state properties
Browser runtime is the most reliable source of information about what happens in your code.
So, in addition to static code analysis, we use runtime type checks to prevent issues in some 
complicated cases. Now, if you accidentally change the type of your state property or initiate
your property with a wrong type, you will be warn about that.

### 10. Build and type definitions
Bundled code and single type definitions endpoint are not provided as a part of package anymore.
We build our library that way, what allows to simplify build process in your development environment
or to use code CDNs to use any module as build endpoint. 
That is much more flexible and modern approach.

### 11. Entity renames
We've renamed some API entities according to developers feedback.

Raw HTML template changes (if don't use "html" tag):
\`\`\`html
<div set="textContent: textVariableName"></div>

→ now it becomes →

<div bind="textContent: textVariableName"></div>
\`\`\`

\`\`\`html
<my-component ctx-name="my_data_ctx"></my-component>
or
<my-component style="--ctx-name: 'my_data_ctx'"></my-component>

→ now it becomes →

<my-component ctx="my_data_ctx"></my-component>
or
<my-component style="--ctx: 'my_data_ctx'"></my-component>
\`\`\`

Dynamic list:
\`\`\`html
<ul repeat="data" repeat-item-tag="list-item"></ul>

→ now it becomes →

<ul itemize="data" item-tag="list-item"></ul>
or 
<ul \${{
  itemize: 'data',
  'item-tag': 'list-item',
}}></ul>
\`\`\`
`;