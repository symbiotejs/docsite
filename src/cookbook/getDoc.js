import tpl from '../tpl/cookbook.htm.js';
import head from '../tpl/head.htm.js';
import { applyData } from '@jam-do/jam-tools/iso/applyData.js';
import { marked } from 'marked';

const backLink = /*html*/ `<a href="./cookbook/" button>← Back to recipes list...</a>`;

/**
 * @typedef {
    'html-description-1' | 
    'html-description-2' | 
    'js-description-1'   | 
    'js-description-2'   |
    'css-description-1'  |
    'css-description-2'  |
    'result-description-1' |
    'result-description-2' 
  } descTypes
 */

/**
 * 
 * @param {{title: String, folder: String, descriptions?: Partial<Record<descTypes?, String>>}} data 
 * @returns 
 */
export function getDoc(data) {
  let getDescriptions = () => {
    let html = '';
    for (let descKey in data.descriptions) {
      html += /*html*/ `<div slot="${descKey}">${marked(data.descriptions[descKey])}</div>`
    }
    return html;
  };
  let pageContent = /*html*/ `
    ${backLink}
    <h1>${data.title}</h1>
    <live-code
      html="https://raw.githubusercontent.com/symbiotejs/examples/main/${data.folder}/index.html"
      js="https://raw.githubusercontent.com/symbiotejs/examples/main/${data.folder}/index.js"
      css="https://raw.githubusercontent.com/symbiotejs/examples/main/${data.folder}/index.css">
      ${getDescriptions()}
    </live-code>
  `;

  return applyData(tpl, {
    HEAD: head('../../'),
    CONTENT: pageContent,
  });
}