export default /*css*/ `
:root {
  --clr-1: #f5f5f5;
  --clr-2: #1a1a2e;
  --primary: #0077cc;
  --surface: #ffffff;

  --gap-min: 2px;
  --gap-mid: 10px;
  --gap-max: 20px;

  --ui-size: 48px;
  --col-w: 960px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--clr-1);
  color: var(--clr-2);
}
`;
