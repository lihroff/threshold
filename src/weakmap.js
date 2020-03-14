const weakmap = new WeakMap();

const register = fn => weakmap.set(fn, 0);

const invoke = fn => {
  const current = get(fn);

  const count = current + 1;
  weakmap.set(fn, count);

  return count;
};

const get = fn => {
  if (!has(fn)) {
    throw new Error(`The function \`${fn.name}\` has not been registered yet.`);
  }

  return weakmap.get(fn);
};

const has = fn => weakmap.has(fn);

module.exports = { register, invoke, get, has };
