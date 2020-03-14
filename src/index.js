const _t = require('./threshold');
const curry = require('lodash.curry');

const { callInfo, resume } = _t;
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
  // TODO: mimic-fn
  callInfo,
  resume,
};

module.exports.default = threshold;
