export default /*css*/ `
nav {
  --l-bg-clr: rgba(0, 0, 0, 1);
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  height: 100vh;
  max-height: 100vh;
  box-sizing: border-box;
  z-index: 10000;
  transition: .3s;
  outline: none;
  overflow: auto;
}

@media screen and (max-width: 1380px) {
  nav {
    background-color: rgba(255, 255, 255, .6);
    backdrop-filter: blur(var(--blur));
    -webkit-backdrop-filter: blur(var(--blur));
    color: #000;
    transform: translateX(calc(-100% + 40px));
    padding-right: var(--ui-h);
    padding-top: var(--ui-h);
    align-items: flex-start;
  }
  nav::after {
    position: absolute;
    content: '☰';
    top: calc(50% - 20px);
    right: 0;
    width: var(--ui-h);
    height: 100%;
    transition: .2s;
    display: flex;
    justify-content: center;
    color: var(--clr-3);
    cursor: pointer;
  }
  nav:focus-within {
    transform: none;
    padding-right: 0;
  }
  nav:focus-within::after {
    opacity: 0;
    pointer-events: none;
  }
  main[sidebar] {
    padding-left: var(--ui-h);
  }
}

nav > .inner {
  padding-top: var(--ui-h);
  padding-bottom: var(--ui-h);
}

nav a {
  --bkt-opacity: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: var(--ui-h);
  padding-left: var(--gap-mid);
  padding-right: var(--gap-mid);
}

nav a::before, nav a::after {
  opacity: var(--bkt-opacity);
  transition: .5s;
}

nav a::before {
  margin-right: .4em;
  content: '[';
}
nav a::after {
  margin-left: .4em;
  content: ']';
}

nav a:hover {
  --bkt-opacity: 1;
}
nav a:focus {
  color: var(--clr-logo-1) !important;
}

nav a.visited {
  color: var(--clr-logo-1);
}
`;