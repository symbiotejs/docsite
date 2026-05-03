import { css } from '@symbiotejs/symbiote';

export default css`
server-info {
  display: flex;
  gap: 0.5em;
  align-items: center;
  padding: 0.75em 1em;
  font-family: system-ui, sans-serif;
  background: var(--surface, #f5f5f5);
  border-radius: 6px;

  .label {
    font-weight: 600;
    color: var(--primary, #007acc);
  }

  time {
    font-variant-numeric: tabular-nums;
    opacity: 0.8;
  }
}
`;