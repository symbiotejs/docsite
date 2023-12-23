import { docPage } from '../docPage.js';

import fs from 'fs';

let md = fs.readFileSync('./src/2x/docs/Context/Context.md').toString();

export default await docPage(md, 'Context')
