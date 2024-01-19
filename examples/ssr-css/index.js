import Symbiote from '@symbiotejs/symbiote';

class MyCom extends Symbiote {
  processInnerHtml = true;

  init$ = {
    onUpdate: () => {
      this.$['--text'] = `Updated text... (${Date.now()})`;
    }
  }
}

MyCom.reg('my-com');