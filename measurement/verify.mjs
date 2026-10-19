import {readFile} from 'node:fs/promises';
import {compare} from './metrics.mjs';
const data=JSON.parse(await readFile(new URL('../data/experiment.synthetic.json',import.meta.url),'utf8'));
console.log(JSON.stringify(compare(data),null,2));
