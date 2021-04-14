import init from '../src/init.js';
import { render } from '../src/init.js';
import sum from '../sum.js';

test('test1', () => {
  expect(render()).toBe('empty file path');
});
