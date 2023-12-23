import { docPage } from '../docPage.js';

import fs from 'fs';

let md = fs.readFileSync('./src/2x/docs/Routing/Routing.md').toString();

export default await docPage(md, 'Routing')
