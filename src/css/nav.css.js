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

@media screen and (max-width: 1350px) {
  nav {
    background-color: rgba(255, 255, 255, .6);
    backdrop-filter: blur(var(--blur));
    -webkit-backdrop-filter: blur(var(--blur));
    color: #000;
    transform: translateX(calc(-100% + 40px));
    padding-right: var(--ui-h);
    padding-top: 40px;
    align-items: flex-start;
  }
  nav::after {
    position: absolute;
    content: '☰';
    top: calc(50% - 20px);
    right: 0;
    width: var(--ui-h);
    transition: .2s;
    display: flex;
    justify-content: center;
    color: var(--clr-3);
    cursor: pointer;
  }
  nav:focus-within {
    transform: none;
  }
  nav:focus-within::after {
    opacity: 0;
  }
  main[sidebar] {
    padding-left: 40px;
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
  padding-left: 2em;
  padding-right: 1em;
  transform-origin: center center;
}

nav a::before, nav a::after {
  margin: .4em;
  opacity: var(--bkt-opacity);
  transition: .5s;
}

nav a::before {
  content: '[';
}
nav a::after {
  content: ']';
}

nav a:hover {
  --bkt-opacity: 1;
}
nav a:focus {
  color: var(--clr-3) !important;
}

nav a.visited {
  color: var(--clr-4);
}

.vid {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-height: 100%;
  width: 100vw;
  max-width: 100%;
  padding: 40px;
  pointer-events: none;
  overflow: hidden;
}
`;