'use strict';
const curry = require('lodash.curry');
const wm = require('./weakmap');
const { getTimeStamp } = require('./date');

const _threshold = (option, fn) => {
  option = option || {};

  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }

  const { times = 1, overflow, within } = option;

  let ret;
  let start = 0;
  const rangeTime = getTimeStamp(within);
  const fnName = fn.displayName || fn.name || '<anonymous>';

  const tFn = (...args) => {
    if (within) {
      const current = new Date().getTime();
      if (wm.get(tFn) === 0) {
        start = current;
      }
      if (current > start + rangeTime) {
        start = current;
        wm.register(tFn);
      }
    }

    let prev = wm.get(tFn);

    if (prev >= times) {
      if (overflow) {
        throw new Error(`Function \`${fnName}\` has reached the max invoke (${times}) times.`);
      }

      return ret;
    }

    ret = fn.apply(this, args);

    const count = wm.invoke(tFn);
    if (count === times && !within) {
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
