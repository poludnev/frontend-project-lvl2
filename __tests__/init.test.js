import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import init from '../src/init.js';
import { render } from '../src/init.js';
// import sum from '../sum.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

test('test1', () => {
  expect(render()).toBe('empty file path');
});
