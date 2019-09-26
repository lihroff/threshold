'use strict';
const curry = require('lodash.curry');
const wm = require('./weakmap');

const _threshold = (option, fn) => {
  if (!option) {
    option = {};
  }

  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }

  const { times = 1, overflow } = option;

  let ret;
  const fnName = fn.displayName || fn.name || '<anonymous>';

  const tFn = (...args) => {
    const count = wm.invoke(tFn);

    if (count > times) {
      if (overflow) {
        throw new Error(`Function \`${fnName}\` has reached the max invoke (${times}) times.`);
      }

      return ret;
    }

    ret = fn.apply(this, args);

    if (count === times) {
      fn = null;
    }

    return ret;
  };

  wm.register(tFn);

  return tFn;
};

const threshold = curry(_threshold);
const once = (fn, opt = {}) =>
  _threshold(
    {
      ...opt,
      times: 1,
    },
    fn,
  );

module.exports = {
  threshold,
  once,
};
module.exports.default = threshold;
