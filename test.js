const threshold = require('./src').default;
const { once, callInfo, resume } = require('./src');

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
  expect(callInfo(fn).times).toEqual(3);
});

test('threshold to 2', () => {
  let i = 0;
  const add = () => ++i;

  const fn = threshold({ times: 2 })(add);

  expect(fn()).toEqual(1);
  expect(callInfo(fn).callable).toEqual(true);
  expect(fn()).toEqual(2);
  expect(callInfo(fn).callable).toEqual(false);
  expect(fn()).toEqual(2);
  expect(callInfo(fn).times).toEqual(3);
});

test('threshold throw an error', () => {
  let i = 0;
  const add = () => ++i;

  const fn = threshold({ times: 2, throw: true })(add);

  expect(fn()).toEqual(1);
  expect(fn()).toEqual(2);
  expect(() => fn()).toThrowError(/Function `.*` has reached the max invoke (.*) times./);
});

test('threshold within 10 sceonds make it recount', async () => {
  let i = 0;
  const add = () => ++i;

  const fn = threshold({ times: 2, within: '10s' /* [x]d [x]h [x]m [x]s */ })(add);

  expect(fn()).toEqual(1);
  expect(fn()).toEqual(2);
  expect(fn()).toEqual(2);
  expect(fn()).toEqual(2);

  jest.setTimeout(20000);
  const data = await new Promise(resovle => {
    setTimeout(() => resovle(), 10000);
  }).then(fn);

  expect(data).toEqual(3);
  expect(fn()).toEqual(4);
  expect(fn()).toEqual(4);
  expect(fn()).toEqual(4);
});

test('callInfo test', () => {
  const dummy = () => {};

  const fn = threshold({ times: 2 })(dummy);

  expect(callInfo(fn)).toEqual({ times: 0, callable: true });
  fn();
  expect(callInfo(fn)).toEqual({ times: 1, callable: true });
  fn();
  expect(callInfo(fn)).toEqual({ times: 2, callable: false });
  fn();
  expect(callInfo(fn)).toEqual({ times: 3, callable: false });
});

test('resume test', () => {
  const dummy = () => {};

  const fn = threshold({ times: 2 })(dummy);

  fn();
  fn();
  expect(callInfo(fn)).toEqual({ times: 2, callable: false });

  expect(resume(fn)).toEqual(true);
  expect(callInfo(fn)).toEqual({ times: 0, callable: true });
  expect(resume(dummy)).toEqual(false);
});
