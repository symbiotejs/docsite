export const rootCss = /*css*/ `
live-code[resolved] {
  transition: opacity .4s;
  opacity: 1;
}
`;

export const shadowCss = /*css*/ `
* {
  box-sizing: border-box;
}
:host {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgb(45, 47, 63);
  padding: 2px;
}
iframe {
  display: block;
  width: 100%;
  height: calc(100% - 40px);
  background-color: #fff;
  border: none;
  border-radius: 4px;
}
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 32px;
  padding-left: .8em;
  padding-right: .8em;
  background-color: rgba(255, 255, 255, .1);
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 2px;
}
button[current] {
  background-color: rgba(255, 255, 255, .8);
  color: #000;
  pointer-events: none;
}
[editors] {
  overflow: auto;
}
[toolbar] {
  display: flex;
  padding: 4px;
  padding-left: 0;
}
[logo] {
  display: block;
  margin-right: 8px;
}
[code] {
  display: none;
}
[code][current] {
  display: block;
}

icon-ui {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 1.4em;
  width: 1.4em;

  svg {
    height: 100%;
    width: 100%;
  }

  path {
    fill: currentColor;
  }
}
`;