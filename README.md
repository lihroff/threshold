# threshold

> Limit function call time.

## usage

```javascript
import { once, threshold } from 'threshold-invoke';

let count = 0;
let fn = () => ++count;
const config = {
  times: 2,
  // overflow: true, // throw err when reaching the threshold
  // within: '1m30s', 90000, '1d1h1m1s'. You can use
  // You can use `within` option to set a time period from which the count will be reset from the first call to the time period.
};
const bar = threshold(config, fn)
// const bar = threshold(config)(fn)
bar();  // 1
bar();  // 2
bar();  // 2

count = 0
fn = (i) => `The ${i} times invoke return: ${++count}`
const onceOpt = {
  overflow: true,
  // within: '1m30s', 90000, '1d1h1m1s'
}

const baz = once(fn, onceOpt?);
baz(1);  // -> The 1 times invoke return: 1
baz(2);  // -> throw err
```
