let phoneStr = '';
let formattedStr = '';
let deleteMode = false;
const phoneInput = document.querySelector('#phoneInput');
const defaultFormat = '({0}{1}{2}) {3}{4}{5}-{6}{7}{8}{9}';

phoneInput.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace')
    deleteMode = true;
  else
    deleteMode = false;
    
});

phoneInput.addEventListener('input', (e) => {
  if (deleteMode) {
    phoneInput.value = phoneInput.value;
    phoneStr = parsePhoneString(phoneInput.value);
  } else {
    if (e.inputType == 'insertText' && !isNaN(parseInt(e.data))) {
      if (phoneStr.length <= 10)
        phoneStr += e.data;
    }

    phoneInput.value = formatPhoneString();
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