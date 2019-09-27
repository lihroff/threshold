const threshold = require('./src').default;
const { once } = require('./src');

test('once', () => {
  let i = 0;
  const add = () => ++i;

  const fn = once(add);

  expect(fn()).toEqual(1);
  expect(fn()).toEqual(1);
  expect(fn()).toEqual(1);
});

test('once with arguments', () => {
  const dummy = i => i;

  const fn = once(dummy);

  expect(fn(3)).toEqual(3);
  expect(fn(2)).toEqual(3);
  expect(fn(1)).toEqual(3);
});

test('threshold to 2', () => {
  let i = 0;
  const add = () => ++i;

  const fn = threshold({ times: 2 })(add);

  expect(fn()).toEqual(1);
  expect(fn()).toEqual(2);
  expect(fn()).toEqual(2);
});

test('threshold throw an error', () => {
  let i = 0;
  const add = () => ++i;

  const fn = threshold({ times: 2, overflow: true })(add);

  expect(fn()).toEqual(1);
  expect(fn()).toEqual(2);
  expect(() => fn()).toThrowError(/Function `.*` has reached the max invoke (.*) times./);
});

test('threshold within 1minute and 3sceond make it recount', async () => {
  let i = 0;
  const add = () => ++i;

  const fn = threshold({ times: 2, within: '1m3s' })(add);

  expect(fn()).toEqual(1);
  expect(fn()).toEqual(2);
  expect(fn()).toEqual(2);
  expect(fn()).toEqual(2);

  jest.setTimeout(600000);
  const data = await new Promise(resovle => {
    setTimeout(() => resovle(), 63000);
  }).then(fn);

  expect(data).toEqual(3);
  expect(fn()).toEqual(4);
  expect(fn()).toEqual(4);
  expect(fn()).toEqual(4);
});
