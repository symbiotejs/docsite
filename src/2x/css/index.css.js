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

  --gap-mid: 10px;

  --card-size: 260px;
}
html, body {
  padding: 0;
  margin: 0;
  color: var(--clr-2);
  background-color: var(--clr-1);
  font-family: monospace;
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

h3 {
  margin-top: 3em;
}
blockquote {
  margin: 0;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, .1);
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
  border-radius: 20px;
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
  background-color: #fff;
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
  background-color: #000;
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

${codeCss}
`;