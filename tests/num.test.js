const sum = require('../src/js/num');

test('test num', () => {
  expect(sum(12, 5)).toBe(17);
  expect(sum(14, 2)).toBe(16);
  expect(sum(1, 5)).toBe(6);
});