import { html } from '@symbiotejs/symbiote';

export default html`
  <h3 ${{textContent: 'heading'}}></h3>
  <p ${{textContent: 'text'}}></p>
  <div class="timer">
    Hydrated: <span ${{textContent: 'elapsed'}}></span>
  </div>
`;