import fs from 'fs';
import { applyData } from 'jsda-kit/iso/applyData.js';
import IMPORTMAP from 'jsda-kit/node/importmap.js';

let tpl = fs.readFileSync(new URL('./tpl/main.tpl.html', import.meta.url), 'utf-8');

export default applyData(tpl, {
  IMPORTMAP,
  TITLE: 'Home',
  CSS_PATH: './css/index.css.js',
  JS_PATH: './browser/index.js',
});
