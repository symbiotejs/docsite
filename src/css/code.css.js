export default /*css*/ `
code {
  display: inline-block;
  background-color: var(--clr-a4);
  color: var(--clr-2);
  padding: var(--gap-mid2);
  border-radius: var(--r1);
  border-bottom: 2px solid var(--clr-a3);
  border-right: 2px solid var(--clr-a3);
}

code[class] {
  display: block;
  padding: var(--gap-max);
  background-color: var(--clr-2);
  color: #fff;
  border-radius: var(--r1);
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