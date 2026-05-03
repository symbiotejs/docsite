import common from '../../css/common.css.js';

export default /*css*/ `
${common}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--ui-size);
  background-color: var(--clr-2);
  color: var(--clr-1);
  padding: 0 var(--gap-max);
}

main {
  max-width: var(--col-w);
  margin: 0 auto;
  padding: var(--gap-max);
}

footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--ui-size);
  background-color: var(--clr-2);
  color: var(--clr-1);
  padding: 0 var(--gap-max);
}
`;
