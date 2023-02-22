import { processMarkdown } from '../../lib/processMarkdown.js';
import docTpl from '../tpl/doc.htm.js';

processMarkdown('./src/docs/', docTpl);

export const FLAGS = {
  processMarkdown: true,
};

export default 'DOCS';