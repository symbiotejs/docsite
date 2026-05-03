import Symbiote, { html, css } from '@symbiotejs/symbiote';

class AppHello extends Symbiote {
  isoMode = true;
  name = 'World';
}

AppHello.template = html`
<div class="greeting">Hello, {{name}}!</div>
`;

AppHello.rootStyles = css`
app-hello {
  display: block;
  padding: 1em;

  .greeting {
    font-size: 1.5rem;
    color: var(--primary, #007acc);
  }
}
`;

AppHello.reg('app-hello');

export default AppHello;
