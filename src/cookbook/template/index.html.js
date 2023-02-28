import tpl from '../../tpl/cookbook.htm.js';
import head from '../../tpl/head.htm.js';
import { applyData } from '@jam-do/jam-tools/iso/applyData.js';

const exampleFolder = 'template';
const backLink = /*html*/ `<a href="./cookbook/">← Back to recipes list...</a>`;

let pageContent = /*html*/ `
${backLink}
<h1>Manual template rendering</h1>
<live-code
  html="https://raw.githubusercontent.com/symbiotejs/examples/main/${exampleFolder}/index.html"
  js="https://raw.githubusercontent.com/symbiotejs/examples/main/${exampleFolder}/index.js"
  css="https://raw.githubusercontent.com/symbiotejs/examples/main/${exampleFolder}/index.css">
</live-code>
`;

export default applyData(tpl, {
  HEAD: head('../../'),
  CONTENT: pageContent,
});