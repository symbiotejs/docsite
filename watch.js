import fs from 'fs';
import { execFile } from 'child_process';
import CFG from './project.cfg.js';

let watchTimeout;
/** @type {import('child_process').ChildProcess} */
let cp;

function rebuild() {
  cp = execFile('node', ['./build.js'], (err, stdout, stderr) => {
    err && console.error(err);
    stdout && console.log(stdout);
    stderr && console.error(stderr);
  });
}

fs.watch(CFG.sourceFolder, {
  recursive: true,
}, () => {
  if (watchTimeout) {
    clearTimeout(watchTimeout);
  }
  watchTimeout = setTimeout(() => {
    if (cp) {
      cp.kill();
      cp = null;
    }
    rebuild();
  });
});

rebuild();