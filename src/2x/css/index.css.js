import codeCss from '../../1x/css/code.css.js';

function rndRadius() {
  return 30 + Math.round(Math.random() * 50) + 'px';
}

function borders() {
  let css = '';
  for (let i = 0; i < 20; i++) {
    css += /*css*/ `
      card-el[n${i + 1}] {
        border-radius: ${rndRadius()} ${rndRadius()} ${rndRadius()} ${rndRadius()};
      }
    `.trim();
  }
  return css;
}

export default /*css*/ `
:root {
  --clr-1: #000;
  --clr-2: #fff;

  --gap-mid: 10px;

  --card-size: 260px;

  --left-col: 160px;
}
html, body {
  padding: 0;
  margin: 0;
  color: var(--clr-2);
  background-color: var(--clr-1);
  font-family: monospace;
  overscroll-behavior: none;
}
* {
  box-sizing: border-box;
}
body {
  display: flex;
  flex-wrap: wrap;
  padding-right: 5px;
  font-size: 14px;
}
a {
  color: currentColor;
  text-decoration: none;
}
article a {
  text-decoration: underline;
}
 
article h3, article h2 {
  margin-top: 3em;
}

article h2 {
  color: #5e5e5e;
}
article h3 {
  color: #2c579c;
}

card-el h3 {
  margin-top: 1em;
  margin-bottom: 0;
}
card-el h2 {
  margin-top: 0;
}

ul {
  position: relative;
  list-style-type: none;
  padding: var(--gap-mid);
  padding-left: 0;
  left: 20px;
}
ul > li {
  display: block;
  margin: 0;
  margin-bottom: 6px;
}
ul > li::before {
  position: absolute;
  left: -20px;
  content: "-";
  color: #c00098;
  margin-right: var(--gap-mid);
}

blockquote {
  margin: 0;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, .2);
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 2px solid currentColor;
}
card-el {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  height: var(--card-size);
  width: var(--card-size);
  max-width: 100%;
  background-color: #c7dd44;
  color: #000;
  padding: 20px;
  margin-top: 5px;
  margin-left: 5px;
  font-size: 18px;
  transition: .3s;
  border-radius: 60px;
}
${borders()}
card-el:hover {
  border-radius: 26px;
}
card-el[double] {
  width: calc(var(--card-size) * 2);
}
card-el[triple] {
  width: calc(var(--card-size) * 3);
}
card-el[max] {
  width: 100%;
}
[clr-1] {
  background-color: rgba(255, 255, 255, .1);
}
[clr-2] {
  background-color: #00aba9;
}
[clr-3] {
  background-color: #7583aa;
  color: #fff;
}
[clr-4] {
  background-color: #ccc;
}
[clr-5] {
  background-color: #ffae6a;
}
[clr-6] {
  background-color: #212121;
  color: #eee;
}
section {
  position: fixed;
  display: block;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  color: #fff;
  background-color: rgba(0, 0, 0, .4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  overflow: auto;
  transition: .4s;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-30px);
}
section:target {
  opacity: 1;
  pointer-events: all;
  transform: none;
}
section [close-panel] {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .4);
  backdrop-filter: blur(8px);
  color: #fff;
  z-index: 100000;
}
section a[close] {
  display: block;
  padding: 20px;
  padding-left: 50px;
}

section-inner {
  display: block;
  background-color: #c7dd44;
  color: #000;
  margin: 30px;
  padding: 20px;
  transition: .3s;
  border-radius: 20px;
  max-width: 1000px;

  & a {
    text-decoration: underline;
  }
}

ims-photo-spinner {
  width: 100%;
  border-radius: 6px;
  color: #fff;
}

accent-block {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .1);
}

layout-el {
  display: block;
  padding-left: var(--left-col);
  background-color: #ccc;
  color: #212121;
  min-height: 100vh;
}

nav {
  position: fixed;
  top: 0;
  right: calc(100vw - var(--left-col));
  bottom: 0;
  padding: 20px;
  padding-right: 10px;
  border-right: 1px solid rgba(0, 0, 0, .1);
}

nav > a {
  --sub-clr: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
  white-space: nowrap;
}
nav > a:hover {
  --sub-clr: #00aba9;
}
nav > a[sub]:after {
  content: '>';
  color: var(--sub-clr);
  margin-left: .5em;
  transition: .3s;
}

nav > a[current] {
  pointer-events: none;
  color: #00aba9;
}

article {
  display: block;
  padding: 20px;
  max-width: 960px;
}

article table {
  border: none;
  border-spacing: 2px;
}

article td {
  background-color: rgba(255, 255, 255, .4);
  padding: .5em;
}
article th {
  background-color: rgba(0, 0, 0, .6);
  color: #fff;
  font-weight: normal;
  padding: .5em;
}

${codeCss}
`;