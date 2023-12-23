import head from '../tpl/head.htm.js';
import { md2html, folders } from '../../../lib/index.js';
import menu from './menu.js';

/**
 * 
 * @param {String} mdTxt
 * @param {String} menuItem
 * @returns 
 */
export async function docPage(mdTxt, menuItem) {
  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    ${head('../../../')}
    <body style="display:block">
      <layout-el>
        ${menu(menuItem)}
        <article>${await md2html(mdTxt)}</article>
      </layout-el>
    </body>
    </html>
  `;
}