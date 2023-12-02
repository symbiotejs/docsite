import { docPage } from '../docPage.js';

import fs from 'fs';

let md = fs.readFileSync('./src/2x/docs/Lifecycle/Lifecycle.md').toString();

export default await docPage(md, 3, {})

