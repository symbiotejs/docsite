import { getDoc } from '../getDoc.js';
import { js2 } from './descriptions.md.js';

export default getDoc({
  title: 'Basic component example',
  folder: 'basic',
  descriptions: {
    'js-description-2': js2,
  },
});