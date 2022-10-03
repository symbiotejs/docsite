import fs from 'fs';
import CFG from './project.cfg.js';
import { findFiles } from '@jam-do/jam-tools/node/index.js';
import { applyData, cssMin } from '@jam-do/jam-tools/iso/index.js';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { title2name } from './lib/title2name.js';

const MD_META_OPEN_TOKEN = '```json';
const MD_META_CLOSE_TOKEN = '```';
const TMP_SPLITTER = '---|||---SPLIT---|||---';

marked.setOptions({
  highlight: (code, lang, callback) => {
    code = hljs.highlight(code, {language: lang}).value;
    callback && callback(undefined, code);
  }
});

/**
 * 
 * @param {String} md 
 * @returns 
 */
function md2html(md) {
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
 * @param {String} dirPath 
 */
function checkDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {
      recursive: true,
    });
  }
}

/**
 * 
 * @param {String} path 
 */
function fmtPath(path) {
  if (path && !path.startsWith('.')) {
    path = './' + path;
  }
  return path;
}

/**
 * 
 * @param {String} path 
 * @returns {Promise<String>}
 */
async function impWa(path) {
  path = fmtPath(path);
  try {
    return (await import(path)).default;
  } catch (e) {
    console.log('WRONG WA PATH: ' + path);
    return null;
  }
}

/**
 * 
 * @param {String} indexPath 
 */
 async function processIndex(indexPath) {
  let indexSrc = await impWa(indexPath);
  if (!indexSrc) {
    return;
  }
  // console.log(indexSrc);
  let outPath = fmtPath(indexPath)
    .replace('.js', '')
    .replace(fmtPath(CFG.sourceFolder), fmtPath(CFG.outputFolder));
  // console.log(outPath);
  checkDir(outPath.split('index.')[0]);
  fs.writeFileSync(outPath, indexSrc);
}

export function build() {
  let indexArr = findFiles(CFG.sourceFolder, ['index.', '.js'], []);
  console.log(indexArr);
  indexArr.forEach((indexPath) => {
    processIndex(indexPath);
  });
}

build();