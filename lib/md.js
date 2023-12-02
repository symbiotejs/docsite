import { md2html } from './processMarkdown.js';
import fs from 'fs';

/**
 * 
 * @param {String} path 
 * @returns 
 */
export async function md(path) {
  let mdTxt = '';
  try {
    mdTxt = (await import(path)).default;
  } catch (e) {
    mdTxt = fs.readFileSync(path).toString();
  }
  return await md2html(mdTxt);
}