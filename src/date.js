const { tail } = require('./utils');

const SECONDS_A_MINUTE = 60;
const SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
const SECONDS_A_DAY = SECONDS_A_HOUR * 24;

const REGEX_TIME_PARSE = /(\d+d)|(\d+h)|(\d+m)|(\d+s)/g;

const getTimeStamp = (input = 0) => {
  if (typeof input === 'number') return input;

  const group = input.match(REGEX_TIME_PARSE);

  return group.reduce((pre, next) => {
    const num = next.slice(0, -1);
    switch (tail(next)) {
      case 'd':
        return pre + num * SECONDS_A_DAY * 1000;
      case 'h':
        return pre + num * SECONDS_A_HOUR * 1000;
      case 'm':
        return pre + num * SECONDS_A_MINUTE * 1000;
      case 's':
        return pre + num * 1000;
    }
  }, 0);
};

module.exports = {
  getTimeStamp,
};
