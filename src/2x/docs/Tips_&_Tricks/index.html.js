import { docPage } from '../docPage.js';

import fs from 'fs';

let md = fs.readFileSync('./src/2x/docs/Tips_&_Tricks/Tips.md').toString();

export default await docPage(md, 10, {})
