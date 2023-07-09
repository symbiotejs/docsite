const bgPath = '../svg/bg/index.svg';

export default /*css*/ `
body {
  padding-top: 60px;
}
header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  backdrop-filter: blur(6px);
  background-color: rgba(255, 255, 255, .8);
  z-index: 100000;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .1);
  max-height: 60px;
  overflow: hidden;
}

header, footer {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--clr-2);
}

footer {
  text-align: center;
  padding: var(--gap-mid);
}

[logo] {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  border-radius: 100%;
}

main {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding-left: var(--gap-mid);
  padding-right: var(--gap-mid);
}
column-el {
  width: 100%;
  max-width: var(--col-w);
}

menu {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: var(--col-w);
  padding: 0;
}
menu > a {
  --l-color: var(--clr-logo-1);
  position: relative;
  display: block;
  text-decoration: none;
  text-shadow: 0 0 12px #fff;
}
menu > a::after {
  content: '';
  position: absolute;
  height: 2px;
  width: 0;
  left: 0;
  bottom: -2px;
  background-color: var(--l-color);
  transition: .2s;
}
menu > a:hover::after, menu > a[current]::after {
  width: 100%;
}
menu > a[current]::after {
  transition: none;
}
menu > a[current] {
  pointer-events: none;
  --l-color: var(--clr-logo-2);
}

article {
  display: block;
  padding: var(--gap-max);
  background-color: #fff;
  margin-top: var(--gap-max2);
  margin-bottom: var(--gap-max);
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  overflow: auto;
  border-radius: var(--r2);
  border-top-right-radius: var(--r1);
  border-bottom-left-radius: var(--r1);
}
article a {
  overflow-wrap: break-word;
}

[center] {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

p {
  margin-bottom: var(--gap-mid);
}

promo-el {
  display: flex;
  flex-wrap: wrap;
  padding: var(--gap-max);
  border-radius: var(--r2);
  border-top-right-radius: var(--r1);
  border-bottom-left-radius: var(--r1);
  color: var(--clr-1);
  margin-top: var(--gap-max2);
  box-shadow: 0 0 12px rgba(0, 0, 0, .4);
}
[promo] {
  display: flex;
  flex-flow: column;
  font-size: 60px;
  font-family: 'Bebas Neue';
  line-height: 60px;
  padding-right: var(--gap-max);
}
[example] {
  flex-grow: 1;
  min-width: 380px;
  margin-top: var(--adaptive-margin-top);
}
[shade] {
  position: relative;
  background-color: #ccc;
  color: rgba(255, 255, 255, .6);
  border-top-left-radius: 100px;
  border-bottom-right-radius: 100px;
}
[shade]:after {
  border: 60px solid rgba(255, 255, 255, .2);
}
[use-bg] {
  background-color: #000;
  background-image: url(${bgPath});
  background-size: cover;
}
`;