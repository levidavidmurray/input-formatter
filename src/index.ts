import {InputFormatterMap, InputFormatterOpts, SkipFormatOpt} from './types';

export const inputFormatterDefaults = {
  formats: {
    3: '(xxx',
    6: '(xxx) xxx',
    10: '(xxx) xxx-xxxx',
    11: '+x (xxx) xxx-xxxx'
  },
  replaceChar: 'x',
  skipFormatOpts: [{length: 10, position: 1, skip: false}],
}

const inputTypeIgnoreList = ['deleteContentBackward', 'deleteContentForward'];

/**
 * Return the InputFormatterMap keys in order of maxlength
 * @param formats
 */
function getMaxLengthKeys(formats: InputFormatterMap): number[] {
  return Object.keys(formats)
      .map((key) => parseInt(key, 10))
      .sort((a, b) => a - b);
}

/**
 * Return any user-defined skipOpt for the current length and position
 * @param skipFormatOpts
 * @param digitChars
 * @param curPosition
 */
function getSkipOpt(skipFormatOpts: SkipFormatOpt[], digitChars: string, curPosition: number) {
  return skipFormatOpts.find(({length, position}) => {
    return digitChars.length === length && curPosition === position;
  });
}

/**
 * Return index of the nth pattern occurrence in a string
 * @param str
 * @param pattern
 * @param n
 */
export function nthIndex(str: string, pattern: string, n: number) {
  let i = -1;
  while (n-- && i++ < str.length) {
    i = str.indexOf(pattern, i);
    if (i < 0) break;
  }
  return i;
}

/**
 * Return only the number values from the input element
 * @param inputElement
 */
function getDigitChars(inputElement: HTMLInputElement): string {
  // TODO: Allow formats with hardcoded integers
  return inputElement.value.replace(/\D/g, '');
}

/**
 * Return the expected format for the current length of digitChars
 * @param formats
 * @param maxLengthKeys
 * @param digitChars
 */
function getFormat(formats: InputFormatterMap, maxLengthKeys: number[], digitChars: string): string {
  return formats[maxLengthKeys.find((len) => digitChars.length <= len)];
}

/**
 * Map digitChars number values to the expected format for the current length
 * @param digitChars
 * @param formatString
 * @param replaceChar
 */
// TODO: Modifying inner values when the next value causes a format shift breaks things
function format(digitChars: string, formatString: string, replaceChar: string): string {
  if (digitChars.length > 0) {
    const lastIndex = nthIndex(formatString, replaceChar, digitChars.length);
    formatString = formatString.substring(0, lastIndex + 1);

    let i = 0;

    return formatString.split('').map((char) => {
      if (char === replaceChar) {
        char = digitChars[i];
        i++;
      }
      return char;
    }).join('');
  }

  return '';
}

/**
 * Determines if the input event should format the current value, and returns a formatter callback
 * @param event
 * @param digitChars
 * @param skipFormatOpts
 */
function handleInput(event: InputEvent, digitChars: string, skipFormatOpts: SkipFormatOpt[]): (formatString: string, replaceChar: string) => void {
  const caretPosition = this.selectionStart;
  const keepPostition = caretPosition !== (event.target as HTMLInputElement).value.length;

  let skipFormat = inputTypeIgnoreList.includes(event.inputType);

  const skipOpt = getSkipOpt(skipFormatOpts, digitChars, caretPosition);
  skipFormat = skipOpt == undefined ? skipFormat : skipOpt.skip;

  return (formatString: string, replaceChar: string): void => {
    if (!skipFormat) {
      this.value = format(digitChars, formatString, replaceChar)

      if (keepPostition) {
        this.selectionEnd = caretPosition;
      }
    }
  }
}

/**
 * Returns a function that prevents the keydown event if digitChars is at maxlength and a numeric input was attempted
 * @param event
 * @param digitChars
 */
function handleKeydown(event: KeyboardEvent, digitChars: string): (formatString: string, replaceChar: string, maxLength: number) => void {
  return (formatString: string, replaceChar: string, maxLength: number) => {
    const digitKey = parseInt(event.key, 10);

    if (digitChars.length >= maxLength && !isNaN(digitKey)) {
      event.preventDefault();
      this.value = format(digitChars, formatString, replaceChar);
    }
  }
}

interface InputFormatter {
  on: (selector?: string) => InputFormatter;
  off: (selector?: string) => void;
}

export function InputFormatter(initOpts: InputFormatterOpts) {

  function on(selector: string, newOpts?: InputFormatterOpts): InputFormatter {
    initOpts = Object.assign({}, initOpts, newOpts);
    const {formats, skipFormatOpts} = initOpts;
    const replaceChar = initOpts.replaceChar || 'x';

    const inputEl = document.querySelector(selector) as HTMLInputElement;

    const maxLengthKeys = getMaxLengthKeys(formats);

    const inputHandler = (event: InputEvent) => {
      const digitChars = getDigitChars(event.target as HTMLInputElement);
      const format = getFormat(formats, maxLengthKeys, digitChars);
      handleInput.call(event.target, event, digitChars, skipFormatOpts)(format, replaceChar);
    }

    const keydownHandler = (event: KeyboardEvent) => {
      const digitChars = getDigitChars(event.target as HTMLInputElement);
      const format = getFormat(formats, maxLengthKeys, digitChars);
      handleKeydown.call(event.target, event, digitChars)(format, replaceChar, maxLengthKeys[maxLengthKeys.length-1]);
    }

    inputEl.addEventListener('input', inputHandler);
    inputEl.addEventListener('keydown', keydownHandler);

    return {
      on(_selector: string = selector): InputFormatter {
        return on(_selector);
      },
      off(): void {
        inputEl.removeEventListener('input', inputHandler);
        inputEl.removeEventListener('keydown', keydownHandler);
      }
    }
  }

  return {on};
}
