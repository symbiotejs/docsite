import { html } from '@symbiotejs/symbiote';

export default html`
  <span class="value">{{count}}</span>
  <button ${{onclick: 'onIncrement'}}>+1</button>
`;