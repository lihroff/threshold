const _t = require('./threshold');
const curry = require('lodash.curry');

const threshold = curry(_t);

const once = (fn, opt) =>
  _t(
    {
      ...(opt || {}),
      times: 1,
    },
    fn,
  );

module.exports = {
  threshold,
  once,
  // Wish it can use a library like minic-fn to do this in the future.
  callInfo: _t.callInfo,
};

module.exports.default = threshold;
