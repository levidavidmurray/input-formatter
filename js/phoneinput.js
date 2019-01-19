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