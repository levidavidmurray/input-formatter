# Phone Input Formatter

<img src="https://github.com/levidavidmurray/phone-input-formatter/raw/master/gif/on.gif" alt="" width="480">

#### Overlycomplicated, and overexplained logic to format phone number input field values from `xxxxxxxxxx` to `(xxx) xxx-xxxx` as you type.

## The Basics
The default format is initialized at the top of the script in the `defaultFormat` constant.
```javascript
const defaultFormat = '({0}{1}{2}) {3}{4}{5}-{6}{7}{8}{9}';
```
The input element's value is then set by calling a `formatPhoneString()` function.
```javascript
userInput.value = formatPhoneString();
```
This replaces any occurences of `{i}` in the `defaultFormat` string with the corresponding indexed value.

Assuming the current `phoneStr` is `'250'`, the string is split into an array. So, `'250'` becomes `['2', '5', '0']`.

This array is then looped over, and `({0}{1}{2}) {3}{4}{5}-{6}{7}{8}{9}` is parsed for any occurences of `{i}`.
```javascript
function formatPhoneString() {
  let strArr = phoneStr.split('');
  formattedStr = defaultFormat;
  for (let i = 0; i < strArr.length; i++) {
    formattedStr = formattedStr.replace(`{${i}}`, strArr[i]);
  }
  
  /*
   If there are no more curly braces in the formattedStr variable, then
   all of the values have been parsed, and we have a complete phone number.
   
   Otherwise we substring to the next curly brace to remove the unwanted formatting
   string from our phone number string.
  */
  if (formattedStr.indexOf('{') === -1)
    return formattedStr;
  else
    return formattedStr.substring(0, formattedStr.indexOf('{'));

}
```
## Wait, why...?
With the script running, you'll only be able to input numbers into the phone field, and the formatting is done automatically
as you type. This is easily done by checking the `isNan()` value of `parseInt(e.data)`.

```javascript
userInput.addEventListener('input', (e) => {
if (deleteMode) {
    userInput.value = userInput.value;
    phoneStr = parsePhoneString(userInput.value);
  } else {
    /* 
    If this event is inserting text, AND it is a number, then add the
    input value (e.data) to the phoneStr variable. (Assuming the string isn't full)    
    */
    if (e.inputType == 'insertText' && !isNaN(parseInt(e.data))) {
      if (phoneStr.length <= 10)
        phoneStr += e.data;
    }

    userInput.value = formatPhoneString();
  }
});
```
This is all validated in the input element's `input` event listener, rather than any of the keystroke (keydown, keyup) 
event listeners as it's much simpler to block out invalid inputs with the `inputType` property on the event object.

However, `input` is called *after* an input has already been made, as opposed to being able to `e.preventDefault()` on
a `keydown` event to prevent any unwanted inputs. `Keydown`, however, doesn't differentiate between input types. I can
handle all my input check with this one code block (line 53). I would need a lot more logic, which would be a lot more 
prone to error, in a `keydown` listener.

###### Now because...

the `input` event listener is called on every *input* event, this means that the input element's value is being set to 
`formatPhoneString()` on EVERY input event. This makes sense, and IS what we want... *however...* Backspace (Delete key) having
a functionality of changing the input (deleting a character), means that everytime Backspace is pressed, we're setting
the input element's value to that formatted string.

This would be fine in most cases, but think about what we're actually doing.

Everytime an input is made, the input value is checked to see if it's a number. If it is a number, that value is
concatenated onto the `phoneStr` variable.
```
<input>.value == '' then phoneStr == ''

<input>.value == '1' then phoneStr == '1'

<input>.value == 'a' then phoneStr == ''

<input>.value == 'f93fjkwo1lkm0' then phoneStr == '9310'
```
So, the problem arises after string is formatted. 
```
'9310' -> formatPhoneString() -> '(931) 0'
```
The input element's value is then set to `(931) 0`. Now, remember, everytime we press backspace, the event listener runs,
and the element's value is set to `formatPhoneString()`. But, `(931) 0` still has a `phoneStr` value of `9310`, so that's good,
because we want to keep the actual phone string `9310`, and the formatted string `(931) 0` separate. When we press backspace 
from `(931) 0` the input value becomes `(931)`, and the phone string is changed to `931`.

###### NOW...

When backspace is pressed from `(931)`, the element's value becomes `(931`, and the phone string's value is set, again, to
`931`. This means we will never get past any non number value in the input string.

## Crazy-Awesome Solution!

Create a deleteMode state that becomes active when the `keydown` listener detects the backspace key. The input element's value
is then set to whatever its current value is, rather than being constantly updated by `formatPhoneString()`. As long as
you're in `deleteMode`, the input will just be a regular text input. However, once any key other than backspace is pressed,
`deleteMode` is deactivated, and normal functionality resumes.

```javascript
let deleteMode = false;

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    deleteMode = true;
  } else {
    deleteMode = false;
  }
});

userInput.addEventListener('input', (e) => {
  if (deleteMode) {
    userInput.value = userInput.value;
    phoneStr = parsePhoneString(userInput.value);
// ...
```
## 

#### That about sums it up for this overcomplicated phone input formatter. Thanks for reading!

&nbsp;

##

## Full Code Snippet

```javascript
let phoneStr = '';
let formattedStr = '';
let deleteMode = false;
const userInput = document.querySelector('#userInput');
const defaultFormat = '({0}{1}{2}) {3}{4}{5}-{6}{7}{8}{9}';

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace')
    deleteMode = true;
  else
    deleteMode = false;
    
});

userInput.addEventListener('input', (e) => {
  if (deleteMode) {
    userInput.value = userInput.value;
    phoneStr = parsePhoneString(userInput.value);
  } else {
    if (e.inputType == 'insertText' && !isNaN(parseInt(e.data))) {
      if (phoneStr.length <= 10)
        phoneStr += e.data;
    }

    userInput.value = formatPhoneString();
  }
});

function formatPhoneString() {
  let strArr = phoneStr.split('');
  formattedStr = defaultFormat;
  for (let i = 0; i < strArr.length; i++) {
    formattedStr = formattedStr.replace(`{${i}}`, strArr[i]);
  }

  if (formattedStr.indexOf('{') === -1)
    return formattedStr;
  else
    return formattedStr.substring(0, formattedStr.indexOf('{'));

}

function parsePhoneString(str) {
  return str.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
}
```




