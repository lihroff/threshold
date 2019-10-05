# threshold

> Limit function call-times.

## usage

```javascript
const { threshold, once, callInfo } = require('threshold-invoke');
// import { threshold, once, callInfo } from 'threshold-invoke';

let count = 0;
let fn = () => ++count;
const config = {
  times: 2,
  // throw: true, // throw err when reaching the threshold
  // within: '1m30s', 90000, '1d1h1m1s'.
  // > You can use `within` option to set a time period start with the first call, beyond which calls will be reset.
const bar = threshold(config, fn)
// const bar = threshold(config)(fn)
bar();          // 1
callInfo(bar)   // { times: 1, callable: true}
bar();          // 2
callInfo(bar)   // { times: 2, callable: false}
bar();          // 2
callInfo(bar)   // { times: 3, callable: false}


count = 0
fn = (i) => `The ${i} times invoke return: ${++count}`
const onceOpt = {
  throw: true,
  // within: '1m30s', 90000, '1d1h1m1s'
}

const baz = once(fn, onceOpt?);
baz(1);  // -> The 1 times invoke return: 1
baz(2);  // -> throw err
```
