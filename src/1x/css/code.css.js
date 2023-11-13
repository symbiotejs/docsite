export default /*css*/ `
code {
  display: inline-block;
  background-color: var(--clr-a4, #000);
  color: var(--clr-2, #fe0);
  border-radius: var(--r1, 6px);
}

code:not([class]) {
  padding: var(.05em);
  padding-left: .5em;
  padding-right: .5em;
}

code[class] {
  display: block;
  padding: var(--gap-max, 20px);
  background-color: var(--clr-2, #000);
  color: #fff;
  overflow: auto;
}

code .hljs-string {
  color: rgb(251, 182, 79);
}
code .hljs-comment {
  color: rgb(149, 149, 149);
  font-style: italic;
}
code .hljs-attr, code .hljs-attribute {
  color: rgb(138, 218, 172);
}
code .hljs-function {
  color: rgb(239, 235, 149);
}
code .hljs-variable {
  color: rgb(121, 183, 255);
}
code .hljs-title {
  color: rgb(180, 243, 255);
}
code .hljs-property, code .hljs-selector-class {
  color: rgb(238, 131, 252);
}
code .hljs-keyword {
  color: rgb(254, 165, 176);
}
code .hljs-tag {
  color: rgb(254, 165, 176);
}
code .hljs-name {
  color: rgb(165, 245, 254);
}
code .hljs-number {
  color: rgb(180, 243, 255);
}
`;