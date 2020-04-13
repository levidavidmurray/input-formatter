# Input Formatter
Input that only allows numbers, and formats the input text to your desired format as you type.

[Try it out!](https://levidavidmurray.github.io/input-formatter/docs)

<img src="https://github.com/levidavidmurray/phone-input-formatter/raw/master/public/showcase.gif" alt="" width="480">

## Usage
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

## Formatter Config

```js
{
  // `formats` takes a specified input max-length as a key, and the desired format 
  // for any numeric input string whose length is less than or equal to the max-length
  formats: {
    3: '(xxx',
    6: '(xxx) xxx',
    10: '(xxx) xxx-xxxx',
    11: '+x (xxx) xxx-xxxx'
  },

  // `replaceChar` specifies the character to replace in each format string
  replaceChar: 'x', // default 'x'

  // `skipFormatOpts` an array specifying whether or not to skip formatting when
  // the input length and caret position are at the specified length and position
  skipFormatOpts: [{length: 10, position: 1, skip: false}],
}
```
