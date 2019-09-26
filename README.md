# threshold

> Limit function call time.

## usage

```javascript
import threshold, { once } from 'threshold-invoke';

let count = 0;
const fn = () => ++count;

const config = {
  times: 1,
  overflow: true, // throw err when rich the threshold.
  // within: Date.now  // "1d 2m 3s 4M 5y 6(millisecond)"
};

threshold(config, fn)();
threshold(config)(fn)();

once(fn);
// once(fn, opt)
// threshold(undefined, fn)
```
