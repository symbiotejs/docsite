import tpl from '../tpl/playground.htm.js';
import head from '../tpl/head.htm.js';
import { applyData } from '@jam-do/jam-tools/iso/applyData.js';

/**
 * 
 * @param {{title: String, folder: String}} data 
 */
export function getDoc(data) {
  let pageContent = /*html*/ `
    <live-code
      html="../examples/${data.folder}/index.html"
      js="../examples/${data.folder}/index.js"
      css="../examples/${data.folder}/index.css">
    </live-code>
  `;

  return applyData(tpl, {
    HEAD: head('../../../'),
    CONTENT: pageContent,
  });
}