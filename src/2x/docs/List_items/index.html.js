import { docPage } from '../docPage.js';

import fs from 'fs';

let md = fs.readFileSync('./src/2x/docs/List_items/List_items.md').toString();

export default await docPage(md, 2, {})

