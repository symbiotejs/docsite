import code from './code.css.js';
import layout from './layout.css.js';

export default /*css*/ `
::-webkit-scrollbar {
  display: none;
}
:root {
  --clr-1: #ccc;
  --clr-2: #000;
  --clr-hl1: #0ff;
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
  --col-w: 980px;
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
  text-shadow: 0 0px 13px currentColor;
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

h2:first-of-type {
  margin-top: 0;
}

${code}
${layout}
`;