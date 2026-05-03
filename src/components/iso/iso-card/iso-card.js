import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

class IsoCard extends Symbiote {
  isoMode = true;

  heading = 'Isomorphic Card';
  text = 'This component renders on both server and client.';
  elapsed = '0s';

  renderCallback() {
    let sec = 0;
    this.#timer = setInterval(() => {
      sec++;
      this.$.elapsed = sec + 's';
    }, 1000);
  }

  destroyCallback() {
    clearInterval(this.#timer);
  }

  #timer;
}

IsoCard.rootStyles = styles;
IsoCard.template = template;
IsoCard.reg('iso-card');

export default IsoCard;
