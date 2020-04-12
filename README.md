# Input Formatter
Input that only allows numbers, and formats the input text to your desired format as you type.

[Try it out!](https://levidavidmurray.github.io/input-formatter)

<img src="https://github.com/levidavidmurray/phone-input-formatter/raw/master/public/showcase.gif" alt="" width="480">

### Usage
```shell script
yarn add @levidavidmurray/input-formatter
```

```typescript
import {InputFormatter} from '@levidavidmurray/input-formatter';

const formatter = InputFormatter({
  formats: {
    3: '(xxx',
    6: '(xxx) xxx',
    10: '(xxx) xxx-xxxx',
    11: '+x (xxx) xxx-xxxx'
  },
  replaceChar: 'x',
  skipFormatOpts: [{length: 10, position: 1, skip: false}],
});

formatter.on('#input');
```

#
