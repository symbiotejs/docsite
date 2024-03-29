import fs from 'fs';
import { marked } from 'marked';
import { applyData } from '@jam-do/jam-tools/iso/applyData.js';
import { checkDirExists } from '@jam-do/jam-tools/node/index.js';
import CFG from '../project.cfg.js';
import hljs from 'highlight.js';

const MD_META_OPEN_TOKEN = '```json';
const MD_META_CLOSE_TOKEN = '```';
const TMP_SPLITTER = '---|||---SPLIT---|||---';

marked.setOptions({
  highlight: (code, lang, callback) => {
    code = hljs.highlight(code, {language: lang}).value;
    callback && callback(undefined, code);
  }
});

let commonMd = '';
let mdTimeout;

/**
 * 
 * @param {String} md 
 * @param {Boolean} [collect]
 * @returns 
 */
export function md2html(md, collect = false) {

  if (collect) {
    commonMd +=  (md + '\n\n');
    if (mdTimeout) {
      clearTimeout(mdTimeout);
    }
    mdTimeout = setTimeout(() => {
      fs.writeFileSync('./COMMON.md', commonMd);
      commonMd = '';
      mdTimeout = null;
    }, 3000);
  }
  
  return new Promise((resolve, reject) => {
    marked.parse(md, (err, html) => {
      if (err) {
        reject();
      }
      resolve(html);
    });
  });
}

/**
 * 
 * @param {String} path 
 * @param {String} tpl
 */
export function processMarkdown(path, tpl) {
  let outputData = {};
  path = path.split('index.')[0];
  console.log('Processing folder: ' + path);

  let allFiles = fs.readdirSync(path);
  let files = allFiles.filter((fPath) => {
    return fPath.includes('.md');
  });
  files.forEach(async (fName) => {
    let fPath = path + fName;
    let fStr = fs.readFileSync(fPath).toString().trim();

    let meta = {};
    if (fStr.startsWith(MD_META_OPEN_TOKEN)) {
      fStr = fStr.replace(MD_META_OPEN_TOKEN, '');
      fStr = fStr.replace(MD_META_CLOSE_TOKEN, TMP_SPLITTER);
      let fileParts = fStr.split(TMP_SPLITTER);
      meta = JSON.parse(fileParts[0]);
      fStr = fileParts[1];
    }

    let html = applyData(tpl, {
      CONTENT: await md2html(fStr),
      ...meta,
    });

    outputData[fName] = {
      meta,
    };

    let outPath = fPath
      .replace('.md', '.html')
      .replace(CFG.sourceFolder, CFG.outputFolder);

    checkDirExists(outPath);
    fs.writeFileSync(outPath, html);
  });

  return outputData;
}