import { processMarkdown } from '../../../lib/processMarkdown.js';
import docTpl from '../tpl/doc.htm.js';

processMarkdown('./src/1x/docs/', docTpl);

export const FLAGS = {
  processMarkdown: true,
};

export default 'DOCS';