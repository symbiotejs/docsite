import Symbiote from '@symbiotejs/symbiote';
import styles from './styles.js';
import template from './template.js';

class ServerInfo extends Symbiote {
  isoMode = true;
  serverTime = new Date().toISOString();
}

ServerInfo.template = template;
ServerInfo.rootStyles = styles;
ServerInfo.reg('server-info');

export default ServerInfo;
