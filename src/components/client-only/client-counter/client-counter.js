import Symbiote from '@symbiotejs/symbiote';
import styles from './styles.js';
import template from './template.js';

class ClientCounter extends Symbiote {
  count = 0;
  onIncrement() {
    this.$.count++;
  };
}

ClientCounter.template = template;
ClientCounter.rootStyles = styles;
ClientCounter.reg('client-counter');

export default ClientCounter;
