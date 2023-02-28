import tpl from '../tpl/cookbook.htm.js';
import head from '../tpl/head.htm.js';
import { applyData } from '@jam-do/jam-tools/iso/applyData.js';

let pageContent = /*html*/ `
<h1>Recipes, useful code examples</h1>

<h2>Basics</h2>
<ul>
  <li><a href="./cookbook/basic/">Basic example</a></li>
  <li><a href="./cookbook/data-context/">Data context</a></li>
  <li><a href="./cookbook/slots/">Slots</a></li>
  <li><a href="./cookbook/tag-names/">Tag names</a></li>
  <li><a href="./cookbook/template/">Manual template rendering</a></li>
  <li><a href="./cookbook/template-processor/">Template processor</a></li>
</ul>

<h2>Lists</h2>
<ul>
  <li><a href="./cookbook/dynamic-list/">Dynamic list rendering</a></li>
  <li><a href="./cookbook/list/">Alternative list rendering</a></li>
  <li><a href="./cookbook/nested-list/">Nested list</a></li>
</ul>

<!-- <h2>Application</h2>
<ul>
  <li><a href="./cookbook/app-routing/">Application routing</a></li>
</ul> -->
`;

export default applyData(tpl, {
  HEAD: head('../'),
  CONTENT: pageContent,
});