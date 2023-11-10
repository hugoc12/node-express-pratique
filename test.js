import path from 'node:path';
import { fileURLToPath } from 'node:url';

console.log(path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    'src'
));