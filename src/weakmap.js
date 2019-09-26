const weakmap = new WeakMap();

const register = fn => weakmap.set(fn, 0);

const invoke = fn => {
  const current = get(fn);

  if (current === undefined) {
    throw Error('The function has not been registered yet.');
  }

  const count = current + 1;
  weakmap.set(fn, count);

  return count;
};

const get = fn => weakmap.get(fn);

module.exports = { register, invoke, get };
