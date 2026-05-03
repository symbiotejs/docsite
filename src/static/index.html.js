import fs from 'fs';
import { md2html } from 'jsda-kit/iso/md2html.js';
import { applyData } from 'jsda-kit/iso/applyData.js';

let tpl = fs.readFileSync(new URL('./page.tpl.html', import.meta.url), 'utf-8');
let content = await md2html(fs.readFileSync('./README.md', 'utf-8'));

export default applyData(tpl, {
  TITLE: '⚠️ DEPRECATION WARNING',
  CONTENT: content,
});
