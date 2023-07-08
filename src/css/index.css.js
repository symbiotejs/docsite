import code from './code.css.js';
import layout from './layout.css.js';
import sidebar from './nav.css.js';

export default /*css*/ `
::-webkit-scrollbar {
  display: none;
}
:root {
  --clr-1: #e6e6e6;
  --clr-2: #000;
  --clr-hl1: #0ff;

  --clr-logo-1: #00aba9;
  --clr-logo-2: #c7dd44;
  --clr-logo-3: #7583aa;

  --clr-a1: rgba(0, 0, 0, .6);
  --clr-a2: rgba(0, 0, 0, .4);
  --clr-a3: rgba(0, 0, 0, .2);
  --clr-a4: rgba(0, 0, 0, .08);

  --gap-min: 2px;
  --gap-mid: 10px;
  --gap-mid2: 6px;
  --gap-max: 20px;
  --gap-max: 40px;

  --r1: 6px;
  --r2: 24px;

  --ui-h: 40px;

  --col-w: 980px;

  --blur: 6px;
}
html, body {
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background-color: var(--clr-1);
  color: var(--clr-2);
  font-family: 'Roboto', sans-serif;
}
* {
  box-sizing: border-box;
}
a {
  color: currentColor;
}
a[button] {
  display: inline-flex;
  align-items: center;
  background-color: #000;
  color: #fff;
  height: var(--ui-h);
  border-radius: var(--r1);
  padding-left: 1em;
  padding-right: 1em;
  text-decoration: none;
}


p {
  margin: 0;
}
blockquote {
  display: block;
  margin: 0;
  margin-top: var(--gap-mid);
  margin-bottom: var(--gap-mid);
  padding: var(--gap-mid);
  border-left: 2px solid currentColor;
  background-color: var(--clr-a4);
}
ul {
  list-style-type: none;
  padding: var(--gap-mid);
}
ul > li {
  margin-bottom: 6px;
}
ul > li::before {
  content: ">";
  color: currentColor;
  text-shadow: 0 0 4px var(--clr-logo-1);
  margin-right: var(--gap-mid);
}
img {
  max-width: 100%;
}
@media screen and (max-width: 800px) {
  :root {
    --gap-max: 20px;
  }
}

live-code {
  opacity: 0;
}

${code}
${layout}
${sidebar}
`;