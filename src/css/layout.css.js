export default /*css*/ `
header, footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--clr-a4);
  color: var(--clr-2);
  padding: var(--gap-mid);
}
footer {
  text-align: center;
}
main {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}
article {
  padding: var(--gap-max);
  width: 100%;
  max-width: var(--col-w);
}
menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: var(--col-w);
}
nav {
  padding: var(--gap-max);
  color: var(--clr-2);
}
nav > a {
  display: block;
  margin-bottom: var(--gap-mid);
}
`;