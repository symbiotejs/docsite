import { css } from '@symbiotejs/symbiote';

export default css`
iso-card {
  display: block;
  font-family: system-ui, sans-serif;
  padding: 1.25em;
  border-radius: 8px;
  background: var(--surface, #fff);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

  h3 {
    margin: 0 0 0.5em;
    color: var(--primary, #007acc);
  }

  p {
    margin: 0;
    line-height: 1.5;
    opacity: 0.85;
  }

  .timer {
    margin-top: 1em;
    padding-top: 0.75em;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 0.85rem;
    color: var(--primary, #007acc);
    font-variant-numeric: tabular-nums;
  }
}
`;