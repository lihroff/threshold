'use strict';
const wm = require('./weakmap');
const { getTimeStamp } = require('./date');
const { getFunctionName } = require('./utils');

const _threshold = (option, fn) => {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }

  const { times = 1, throw: isThrow, within } = option || {};

  let ret;
  let startTime;
  const rangeTime = getTimeStamp(within);
  const fnName = getFunctionName(fn);

  const tFn = (...args) => {
    if (within) {
      const now = new Date().getTime();
      if (wm.get(tFn) === 0) {
        startTime = now;
      }
      if (now > startTime + rangeTime) {
        startTime = now;
        wm.register(tFn);
      }
    }

    const current = wm.invoke(tFn);

    if (current > times) {
      if (isThrow) {
        throw new Error(`Function \`${fnName}\` has reached the max invoke (${times}) times.`);
      }
    } else {
      ret = fn.apply(this, args);

      // should clear unneed reference.
      if (!within && current === times) {
        fn = null;
      }
    }

    return ret;
  };

  wm.register(tFn);

  tFn._times = times;

  return tFn;
};

_threshold.callInfo = fn => {
  const times = wm.get(fn);
  return {
    times,
    callable: times < fn._times,
  };
};

module.exports = _threshold;
