import { docPage } from '../docPage.js';

import fs from 'fs';

let md = fs.readFileSync('./src/2x/docs/Get_started/Get_started.md').toString();

export default await docPage(md, 'Get started')

