/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
var index_1 = __webpack_require__(5);
index_1.InputFormatter({
    formats: {
        3: '(xxx',
        6: '(xxx) xxx',
        10: '(xxx) xxx-xxxx',
    },
    skipFormatOpts: [
        { length: 10, position: 1, skip: false },
    ],
}).on('#input');


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(2);
            var content = __webpack_require__(3);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "*,\n:before,\n:after {\n    box-sizing: border-box;\n}\n\nbody {\n    background: #eceff1;\n    margin: 0;\n    font-family: 'Aleo', serif;\n}\n\n.group {\n    position: relative;\n    top: -100px;\n    margin: 45px 0;\n}\n\n@media screen and (max-height: 700px) {\n    .group {\n        top: auto;\n    }\n}\n\ntextarea {\n    resize: none;\n}\n\n.container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    position: relative;\n}\n\ninput,\ntextarea {\n    font-family: 'Aleo', serif;\n    background: none;\n    color: #9e9e9e;\n    font-size: 1.8em;\n    padding: 10px 10px 10px 5px;\n    display: block;\n    width: 320px;\n    border: none;\n    border-radius: 0;\n    border-bottom: 1px solid #9e9e9e;\n}\n\ninput:focus,\ntextarea:focus {\n    outline: none;\n}\n\ninput:focus ~ label, input:valid ~ label,\ntextarea:focus ~ label,\ntextarea:valid ~ label {\n    top: -14px;\n    font-size: 12px;\n    color: #2196F3;\n}\n\ninput:focus ~ .bar:before,\ntextarea:focus ~ .bar:before {\n    width: 320px;\n}\n\ninput[type=\"password\"] {\n    letter-spacing: 0.3em;\n}\n\nlabel {\n    color: #9e9e9e;\n    font-size: 20px;\n    font-weight: normal;\n    position: absolute;\n    pointer-events: none;\n    left: 5px;\n    top: 27px;\n    transition: 300ms ease all;\n}\n\n.bar {\n    position: relative;\n    display: block;\n    width: 320px;\n}\n\n.bar:before {\n    content: '';\n    height: 2px;\n    width: 0;\n    bottom: 0px;\n    position: absolute;\n    background: #2196F3;\n    transition: 300ms ease all;\n    left: 0%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.inputFormatterDefaults = {
    formats: {
        3: '(xxx',
        6: '(xxx) xxx',
        10: '(xxx) xxx-xxxx',
        11: '+x (xxx) xxx-xxxx'
    },
    replaceChar: 'x',
    skipFormatOpts: [{ length: 10, position: 1, skip: false }],
};
var inputTypeIgnoreList = ['deleteContentBackward', 'deleteContentForward'];
/**
 * Return the InputFormatterMap keys in order of maxlength
 * @param formats
 */
function getMaxLengthKeys(formats) {
    return Object.keys(formats)
        .map(function (key) { return parseInt(key, 10); })
        .sort(function (a, b) { return a - b; });
}
/**
 * Return any user-defined skipOpt for the current length and position
 * @param skipFormatOpts
 * @param digitChars
 * @param curPosition
 */
function getSkipOpt(skipFormatOpts, digitChars, curPosition) {
    return skipFormatOpts.find(function (_a) {
        var length = _a.length, position = _a.position;
        return digitChars.length === length && curPosition === position;
    });
}
/**
 * Return index of the nth pattern occurrence in a string
 * @param str
 * @param pattern
 * @param n
 */
function nthIndex(str, pattern, n) {
    var i = -1;
    while (n-- && i++ < str.length) {
        i = str.indexOf(pattern, i);
        if (i < 0)
            break;
    }
    return i;
}
exports.nthIndex = nthIndex;
/**
 * Return only the number values from the input element
 * @param inputElement
 */
function getDigitChars(inputElement) {
    // TODO: Allow formats with hardcoded integers
    return inputElement.value.replace(/\D/g, '');
}
/**
 * Return the expected format for the current length of digitChars
 * @param formats
 * @param maxLengthKeys
 * @param digitChars
 */
function getFormat(formats, maxLengthKeys, digitChars) {
    return formats[maxLengthKeys.find(function (len) { return digitChars.length <= len; })];
}
/**
 * Map digitChars number values to the expected format for the current length
 * @param digitChars
 * @param formatString
 * @param replaceChar
 */
// TODO: Modifying inner values when the next value causes a format shift breaks things
function format(digitChars, formatString, replaceChar) {
    if (digitChars.length > 0) {
        var lastIndex = nthIndex(formatString, replaceChar, digitChars.length);
        formatString = formatString.substring(0, lastIndex + 1);
        var i_1 = 0;
        return formatString.split('').map(function (char) {
            if (char === replaceChar) {
                char = digitChars[i_1];
                i_1++;
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
function handleInput(event, digitChars, skipFormatOpts) {
    var _this = this;
    var caretPosition = this.selectionStart;
    var keepPostition = caretPosition !== event.target.value.length;
    var skipFormat = inputTypeIgnoreList.includes(event.inputType);
    var skipOpt = getSkipOpt(skipFormatOpts, digitChars, caretPosition);
    skipFormat = skipOpt == undefined ? skipFormat : skipOpt.skip;
    return function (formatString, replaceChar) {
        if (!skipFormat) {
            _this.value = format(digitChars, formatString, replaceChar);
            if (keepPostition) {
                _this.selectionEnd = caretPosition;
            }
        }
    };
}
/**
 * Returns a function that prevents the keydown event if digitChars is at maxlength and a numeric input was attempted
 * @param event
 * @param digitChars
 */
function handleKeydown(event, digitChars) {
    var _this = this;
    return function (formatString, replaceChar, maxLength) {
        var digitKey = parseInt(event.key, 10);
        if (digitChars.length >= maxLength && !isNaN(digitKey)) {
            event.preventDefault();
            _this.value = format(digitChars, formatString, replaceChar);
        }
    };
}
function InputFormatter(initOpts) {
    function on(selector, newOpts) {
        initOpts = Object.assign({}, initOpts, newOpts);
        var formats = initOpts.formats, skipFormatOpts = initOpts.skipFormatOpts;
        var replaceChar = initOpts.replaceChar || 'x';
        var inputEl = document.querySelector(selector);
        var maxLengthKeys = getMaxLengthKeys(formats);
        var inputHandler = function (event) {
            var digitChars = getDigitChars(event.target);
            var format = getFormat(formats, maxLengthKeys, digitChars);
            handleInput.call(event.target, event, digitChars, skipFormatOpts)(format, replaceChar);
        };
        var keydownHandler = function (event) {
            var digitChars = getDigitChars(event.target);
            var format = getFormat(formats, maxLengthKeys, digitChars);
            handleKeydown.call(event.target, event, digitChars)(format, replaceChar, maxLengthKeys[maxLengthKeys.length - 1]);
        };
        inputEl.addEventListener('input', inputHandler);
        inputEl.addEventListener('keydown', keydownHandler);
        return {
            on: function (_selector) {
                if (_selector === void 0) { _selector = selector; }
                return on(_selector);
            },
            off: function () {
                inputEl.removeEventListener('input', inputHandler);
                inputEl.removeEventListener('keydown', keydownHandler);
            }
        };
    }
    return { on: on };
}
exports.InputFormatter = InputFormatter;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4YW1wbGUudHMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3N0eWxlcy5jc3M/ZWEzMyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7OztBQ2xGQSx1QkFBOEI7QUFDOUIscUNBQXVDO0FBRXZDLHNCQUFjLENBQUM7SUFDYixPQUFPLEVBQUU7UUFDUCxDQUFDLEVBQUUsTUFBTTtRQUNULENBQUMsRUFBRSxXQUFXO1FBQ2QsRUFBRSxFQUFFLGdCQUFnQjtLQUNyQjtJQUNELGNBQWMsRUFBRTtRQUNkLEVBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUM7S0FDdkM7Q0FDRixDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7O0FDWmhCLFVBQVUsbUJBQU8sQ0FBQyxDQUF3RTtBQUMxRiwwQkFBMEIsbUJBQU8sQ0FBQyxDQUF1RDs7QUFFekY7O0FBRUE7QUFDQSwwQkFBMEIsUUFBUztBQUNuQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOzs7O0FBSUEsMEI7Ozs7Ozs7QUNwQmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RDs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixLQUF3QyxHQUFHLHNCQUFpQixHQUFHLFNBQUk7O0FBRW5GO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLHFFQUFxRSxxQkFBcUIsYUFBYTs7QUFFdkc7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxHQUFHOztBQUVIOzs7QUFHQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDRCQUE0QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsNkJBQTZCO0FBQ2pEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7QUM1UUE7QUFDQSxrQ0FBa0MsbUJBQU8sQ0FBQyxDQUFnRDtBQUMxRjtBQUNBO0FBQ0EsY0FBYyxRQUFTLHlCQUF5Qiw2QkFBNkIsR0FBRyxVQUFVLDBCQUEwQixnQkFBZ0IsaUNBQWlDLEdBQUcsWUFBWSx5QkFBeUIsa0JBQWtCLHFCQUFxQixHQUFHLDJDQUEyQyxjQUFjLG9CQUFvQixPQUFPLEdBQUcsY0FBYyxtQkFBbUIsR0FBRyxnQkFBZ0Isb0JBQW9CLDhCQUE4QiwwQkFBMEIsb0JBQW9CLHlCQUF5QixHQUFHLHNCQUFzQixpQ0FBaUMsdUJBQXVCLHFCQUFxQix1QkFBdUIsa0NBQWtDLHFCQUFxQixtQkFBbUIsbUJBQW1CLHVCQUF1Qix1Q0FBdUMsR0FBRyxrQ0FBa0Msb0JBQW9CLEdBQUcsZ0dBQWdHLGlCQUFpQixzQkFBc0IscUJBQXFCLEdBQUcsOERBQThELG1CQUFtQixHQUFHLDhCQUE4Qiw0QkFBNEIsR0FBRyxXQUFXLHFCQUFxQixzQkFBc0IsMEJBQTBCLHlCQUF5QiwyQkFBMkIsZ0JBQWdCLGdCQUFnQixpQ0FBaUMsR0FBRyxVQUFVLHlCQUF5QixxQkFBcUIsbUJBQW1CLEdBQUcsaUJBQWlCLGtCQUFrQixrQkFBa0IsZUFBZSxrQkFBa0IseUJBQXlCLDBCQUEwQixpQ0FBaUMsZUFBZSxHQUFHO0FBQ2psRDtBQUNBOzs7Ozs7OztBQ05hOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEMscUJBQXFCO0FBQ2pFOztBQUVBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qjs7QUFFOUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsY0FBYztBQUNuRTtBQUNBLEM7Ozs7Ozs7OztBQzNGYSw4QkFBc0IsR0FBRztJQUNwQyxPQUFPLEVBQUU7UUFDUCxDQUFDLEVBQUUsTUFBTTtRQUNULENBQUMsRUFBRSxXQUFXO1FBQ2QsRUFBRSxFQUFFLGdCQUFnQjtRQUNwQixFQUFFLEVBQUUsbUJBQW1CO0tBQ3hCO0lBQ0QsV0FBVyxFQUFFLEdBQUc7SUFDaEIsY0FBYyxFQUFFLENBQUMsRUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO0NBQ3pEO0FBRUQsSUFBTSxtQkFBbUIsR0FBRyxDQUFDLHVCQUF1QixFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFFOUU7OztHQUdHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxPQUEwQjtJQUNsRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3RCLEdBQUcsQ0FBQyxVQUFDLEdBQUcsSUFBSyxlQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFqQixDQUFpQixDQUFDO1NBQy9CLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssUUFBQyxHQUFHLENBQUMsRUFBTCxDQUFLLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFTLFVBQVUsQ0FBQyxjQUErQixFQUFFLFVBQWtCLEVBQUUsV0FBbUI7SUFDMUYsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFBa0I7WUFBakIsa0JBQU0sRUFBRSxzQkFBUTtRQUMzQyxPQUFPLFVBQVUsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLFdBQVcsS0FBSyxRQUFRLENBQUM7SUFDbEUsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixRQUFRLENBQUMsR0FBVyxFQUFFLE9BQWUsRUFBRSxDQUFTO0lBQzlELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ1gsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQzlCLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDO1lBQUUsTUFBTTtLQUNsQjtJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQVBELDRCQU9DO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxhQUFhLENBQUMsWUFBOEI7SUFDbkQsOENBQThDO0lBQzlDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQVMsU0FBUyxDQUFDLE9BQTBCLEVBQUUsYUFBdUIsRUFBRSxVQUFrQjtJQUN4RixPQUFPLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRyxJQUFLLGlCQUFVLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsdUZBQXVGO0FBQ3ZGLFNBQVMsTUFBTSxDQUFDLFVBQWtCLEVBQUUsWUFBb0IsRUFBRSxXQUFtQjtJQUMzRSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3pCLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RSxZQUFZLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXhELElBQUksR0FBQyxHQUFHLENBQUMsQ0FBQztRQUVWLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO1lBQ3JDLElBQUksSUFBSSxLQUFLLFdBQVcsRUFBRTtnQkFDeEIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDckIsR0FBQyxFQUFFLENBQUM7YUFDTDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ2I7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQVMsV0FBVyxDQUFDLEtBQWlCLEVBQUUsVUFBa0IsRUFBRSxjQUErQjtJQUEzRixpQkFrQkM7SUFqQkMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMxQyxJQUFNLGFBQWEsR0FBRyxhQUFhLEtBQU0sS0FBSyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUV4RixJQUFJLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRS9ELElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3RFLFVBQVUsR0FBRyxPQUFPLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFFOUQsT0FBTyxVQUFDLFlBQW9CLEVBQUUsV0FBbUI7UUFDL0MsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDO1lBRTFELElBQUksYUFBYSxFQUFFO2dCQUNqQixLQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQzthQUNuQztTQUNGO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxhQUFhLENBQUMsS0FBb0IsRUFBRSxVQUFrQjtJQUEvRCxpQkFTQztJQVJDLE9BQU8sVUFBQyxZQUFvQixFQUFFLFdBQW1CLEVBQUUsU0FBaUI7UUFDbEUsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFekMsSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN0RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7QUFDSCxDQUFDO0FBT0QsU0FBZ0IsY0FBYyxDQUFDLFFBQTRCO0lBRXpELFNBQVMsRUFBRSxDQUFDLFFBQWdCLEVBQUUsT0FBNEI7UUFDeEQsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6Qyw4QkFBTyxFQUFFLHdDQUFjLENBQWE7UUFDM0MsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUM7UUFFaEQsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQXFCLENBQUM7UUFFckUsSUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFaEQsSUFBTSxZQUFZLEdBQUcsVUFBQyxLQUFpQjtZQUNyQyxJQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQTBCLENBQUMsQ0FBQztZQUNuRSxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM3RCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDekYsQ0FBQztRQUVELElBQU0sY0FBYyxHQUFHLFVBQUMsS0FBb0I7WUFDMUMsSUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUEwQixDQUFDLENBQUM7WUFDbkUsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDN0QsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEgsQ0FBQztRQUVELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUVwRCxPQUFPO1lBQ0wsRUFBRSxFQUFGLFVBQUcsU0FBNEI7Z0JBQTVCLGdEQUE0QjtnQkFDN0IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUNELEdBQUcsRUFBSDtnQkFDRSxPQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ3pELENBQUM7U0FDRjtJQUNILENBQUM7SUFFRCxPQUFPLEVBQUMsRUFBRSxNQUFDLENBQUM7QUFDZCxDQUFDO0FBdENELHdDQXNDQyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0ICcuLi9wdWJsaWMvc3R5bGVzLmNzcyc7XG5pbXBvcnQge0lucHV0Rm9ybWF0dGVyfSBmcm9tICcuL2luZGV4JztcblxuSW5wdXRGb3JtYXR0ZXIoe1xuICBmb3JtYXRzOiB7XG4gICAgMzogJyh4eHgnLFxuICAgIDY6ICcoeHh4KSB4eHgnLFxuICAgIDEwOiAnKHh4eCkgeHh4LXh4eHgnLFxuICB9LFxuICBza2lwRm9ybWF0T3B0czogW1xuICAgIHtsZW5ndGg6IDEwLCBwb3NpdGlvbjogMSwgc2tpcDogZmFsc2V9LFxuICBdLFxufSkub24oJyNpbnB1dCcpO1xuIiwidmFyIGFwaSA9IHJlcXVpcmUoXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCIpO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIik7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50Ll9fZXNNb2R1bGUgPyBjb250ZW50LmRlZmF1bHQgOiBjb250ZW50O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgICAgIH1cblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cbnZhciBleHBvcnRlZCA9IGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB7fTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0ZWQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc09sZElFID0gZnVuY3Rpb24gaXNPbGRJRSgpIHtcbiAgdmFyIG1lbW87XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcbiAgICBpZiAodHlwZW9mIG1lbW8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuICAgICAgLy8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuICAgICAgLy8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcbiAgICAgIG1lbW8gPSBCb29sZWFuKHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn0oKTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uIGdldFRhcmdldCgpIHtcbiAgdmFyIG1lbW8gPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtb1t0YXJnZXRdO1xuICB9O1xufSgpO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgdmFyIGF0dHJpYnV0ZXMgPSBvcHRpb25zLmF0dHJpYnV0ZXMgfHwge307XG5cbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIGF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5tZWRpYSA/IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIikuY29uY2F0KG9iai5jc3MsIFwifVwiKSA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdtZWRpYScpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiBidG9hKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiosXFxuOmJlZm9yZSxcXG46YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgYmFja2dyb3VuZDogI2VjZWZmMTtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBmb250LWZhbWlseTogJ0FsZW8nLCBzZXJpZjtcXG59XFxuXFxuLmdyb3VwIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IC0xMDBweDtcXG4gICAgbWFyZ2luOiA0NXB4IDA7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiA3MDBweCkge1xcbiAgICAuZ3JvdXAge1xcbiAgICAgICAgdG9wOiBhdXRvO1xcbiAgICB9XFxufVxcblxcbnRleHRhcmVhIHtcXG4gICAgcmVzaXplOiBub25lO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuaW5wdXQsXFxudGV4dGFyZWEge1xcbiAgICBmb250LWZhbWlseTogJ0FsZW8nLCBzZXJpZjtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgY29sb3I6ICM5ZTllOWU7XFxuICAgIGZvbnQtc2l6ZTogMS44ZW07XFxuICAgIHBhZGRpbmc6IDEwcHggMTBweCAxMHB4IDVweDtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAzMjBweDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiAwO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzllOWU5ZTtcXG59XFxuXFxuaW5wdXQ6Zm9jdXMsXFxudGV4dGFyZWE6Zm9jdXMge1xcbiAgICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG5pbnB1dDpmb2N1cyB+IGxhYmVsLCBpbnB1dDp2YWxpZCB+IGxhYmVsLFxcbnRleHRhcmVhOmZvY3VzIH4gbGFiZWwsXFxudGV4dGFyZWE6dmFsaWQgfiBsYWJlbCB7XFxuICAgIHRvcDogLTE0cHg7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgY29sb3I6ICMyMTk2RjM7XFxufVxcblxcbmlucHV0OmZvY3VzIH4gLmJhcjpiZWZvcmUsXFxudGV4dGFyZWE6Zm9jdXMgfiAuYmFyOmJlZm9yZSB7XFxuICAgIHdpZHRoOiAzMjBweDtcXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwicGFzc3dvcmRcXFwiXSB7XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjNlbTtcXG59XFxuXFxubGFiZWwge1xcbiAgICBjb2xvcjogIzllOWU5ZTtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICBsZWZ0OiA1cHg7XFxuICAgIHRvcDogMjdweDtcXG4gICAgdHJhbnNpdGlvbjogMzAwbXMgZWFzZSBhbGw7XFxufVxcblxcbi5iYXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMzIwcHg7XFxufVxcblxcbi5iYXI6YmVmb3JlIHtcXG4gICAgY29udGVudDogJyc7XFxuICAgIGhlaWdodDogMnB4O1xcbiAgICB3aWR0aDogMDtcXG4gICAgYm90dG9tOiAwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYmFja2dyb3VuZDogIzIxOTZGMztcXG4gICAgdHJhbnNpdGlvbjogMzAwbXMgZWFzZSBhbGw7XFxuICAgIGxlZnQ6IDAlO1xcbn1cXG5cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG5cbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgJycpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gIHJldHVybiBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG59IiwiaW1wb3J0IHtJbnB1dEZvcm1hdHRlck1hcCwgSW5wdXRGb3JtYXR0ZXJPcHRzLCBTa2lwRm9ybWF0T3B0fSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IGlucHV0Rm9ybWF0dGVyRGVmYXVsdHMgPSB7XG4gIGZvcm1hdHM6IHtcbiAgICAzOiAnKHh4eCcsXG4gICAgNjogJyh4eHgpIHh4eCcsXG4gICAgMTA6ICcoeHh4KSB4eHgteHh4eCcsXG4gICAgMTE6ICcreCAoeHh4KSB4eHgteHh4eCdcbiAgfSxcbiAgcmVwbGFjZUNoYXI6ICd4JyxcbiAgc2tpcEZvcm1hdE9wdHM6IFt7bGVuZ3RoOiAxMCwgcG9zaXRpb246IDEsIHNraXA6IGZhbHNlfV0sXG59XG5cbmNvbnN0IGlucHV0VHlwZUlnbm9yZUxpc3QgPSBbJ2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcsICdkZWxldGVDb250ZW50Rm9yd2FyZCddO1xuXG4vKipcbiAqIFJldHVybiB0aGUgSW5wdXRGb3JtYXR0ZXJNYXAga2V5cyBpbiBvcmRlciBvZiBtYXhsZW5ndGhcbiAqIEBwYXJhbSBmb3JtYXRzXG4gKi9cbmZ1bmN0aW9uIGdldE1heExlbmd0aEtleXMoZm9ybWF0czogSW5wdXRGb3JtYXR0ZXJNYXApOiBudW1iZXJbXSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhmb3JtYXRzKVxuICAgICAgLm1hcCgoa2V5KSA9PiBwYXJzZUludChrZXksIDEwKSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG59XG5cbi8qKlxuICogUmV0dXJuIGFueSB1c2VyLWRlZmluZWQgc2tpcE9wdCBmb3IgdGhlIGN1cnJlbnQgbGVuZ3RoIGFuZCBwb3NpdGlvblxuICogQHBhcmFtIHNraXBGb3JtYXRPcHRzXG4gKiBAcGFyYW0gZGlnaXRDaGFyc1xuICogQHBhcmFtIGN1clBvc2l0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldFNraXBPcHQoc2tpcEZvcm1hdE9wdHM6IFNraXBGb3JtYXRPcHRbXSwgZGlnaXRDaGFyczogc3RyaW5nLCBjdXJQb3NpdGlvbjogbnVtYmVyKSB7XG4gIHJldHVybiBza2lwRm9ybWF0T3B0cy5maW5kKCh7bGVuZ3RoLCBwb3NpdGlvbn0pID0+IHtcbiAgICByZXR1cm4gZGlnaXRDaGFycy5sZW5ndGggPT09IGxlbmd0aCAmJiBjdXJQb3NpdGlvbiA9PT0gcG9zaXRpb247XG4gIH0pO1xufVxuXG4vKipcbiAqIFJldHVybiBpbmRleCBvZiB0aGUgbnRoIHBhdHRlcm4gb2NjdXJyZW5jZSBpbiBhIHN0cmluZ1xuICogQHBhcmFtIHN0clxuICogQHBhcmFtIHBhdHRlcm5cbiAqIEBwYXJhbSBuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBudGhJbmRleChzdHI6IHN0cmluZywgcGF0dGVybjogc3RyaW5nLCBuOiBudW1iZXIpIHtcbiAgbGV0IGkgPSAtMTtcbiAgd2hpbGUgKG4tLSAmJiBpKysgPCBzdHIubGVuZ3RoKSB7XG4gICAgaSA9IHN0ci5pbmRleE9mKHBhdHRlcm4sIGkpO1xuICAgIGlmIChpIDwgMCkgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGk7XG59XG5cbi8qKlxuICogUmV0dXJuIG9ubHkgdGhlIG51bWJlciB2YWx1ZXMgZnJvbSB0aGUgaW5wdXQgZWxlbWVudFxuICogQHBhcmFtIGlucHV0RWxlbWVudFxuICovXG5mdW5jdGlvbiBnZXREaWdpdENoYXJzKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHN0cmluZyB7XG4gIC8vIFRPRE86IEFsbG93IGZvcm1hdHMgd2l0aCBoYXJkY29kZWQgaW50ZWdlcnNcbiAgcmV0dXJuIGlucHV0RWxlbWVudC52YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgZXhwZWN0ZWQgZm9ybWF0IGZvciB0aGUgY3VycmVudCBsZW5ndGggb2YgZGlnaXRDaGFyc1xuICogQHBhcmFtIGZvcm1hdHNcbiAqIEBwYXJhbSBtYXhMZW5ndGhLZXlzXG4gKiBAcGFyYW0gZGlnaXRDaGFyc1xuICovXG5mdW5jdGlvbiBnZXRGb3JtYXQoZm9ybWF0czogSW5wdXRGb3JtYXR0ZXJNYXAsIG1heExlbmd0aEtleXM6IG51bWJlcltdLCBkaWdpdENoYXJzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZm9ybWF0c1ttYXhMZW5ndGhLZXlzLmZpbmQoKGxlbikgPT4gZGlnaXRDaGFycy5sZW5ndGggPD0gbGVuKV07XG59XG5cbi8qKlxuICogTWFwIGRpZ2l0Q2hhcnMgbnVtYmVyIHZhbHVlcyB0byB0aGUgZXhwZWN0ZWQgZm9ybWF0IGZvciB0aGUgY3VycmVudCBsZW5ndGhcbiAqIEBwYXJhbSBkaWdpdENoYXJzXG4gKiBAcGFyYW0gZm9ybWF0U3RyaW5nXG4gKiBAcGFyYW0gcmVwbGFjZUNoYXJcbiAqL1xuLy8gVE9ETzogTW9kaWZ5aW5nIGlubmVyIHZhbHVlcyB3aGVuIHRoZSBuZXh0IHZhbHVlIGNhdXNlcyBhIGZvcm1hdCBzaGlmdCBicmVha3MgdGhpbmdzXG5mdW5jdGlvbiBmb3JtYXQoZGlnaXRDaGFyczogc3RyaW5nLCBmb3JtYXRTdHJpbmc6IHN0cmluZywgcmVwbGFjZUNoYXI6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChkaWdpdENoYXJzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBsYXN0SW5kZXggPSBudGhJbmRleChmb3JtYXRTdHJpbmcsIHJlcGxhY2VDaGFyLCBkaWdpdENoYXJzLmxlbmd0aCk7XG4gICAgZm9ybWF0U3RyaW5nID0gZm9ybWF0U3RyaW5nLnN1YnN0cmluZygwLCBsYXN0SW5kZXggKyAxKTtcblxuICAgIGxldCBpID0gMDtcblxuICAgIHJldHVybiBmb3JtYXRTdHJpbmcuc3BsaXQoJycpLm1hcCgoY2hhcikgPT4ge1xuICAgICAgaWYgKGNoYXIgPT09IHJlcGxhY2VDaGFyKSB7XG4gICAgICAgIGNoYXIgPSBkaWdpdENoYXJzW2ldO1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hhcjtcbiAgICB9KS5qb2luKCcnKTtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnB1dCBldmVudCBzaG91bGQgZm9ybWF0IHRoZSBjdXJyZW50IHZhbHVlLCBhbmQgcmV0dXJucyBhIGZvcm1hdHRlciBjYWxsYmFja1xuICogQHBhcmFtIGV2ZW50XG4gKiBAcGFyYW0gZGlnaXRDaGFyc1xuICogQHBhcmFtIHNraXBGb3JtYXRPcHRzXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUlucHV0KGV2ZW50OiBJbnB1dEV2ZW50LCBkaWdpdENoYXJzOiBzdHJpbmcsIHNraXBGb3JtYXRPcHRzOiBTa2lwRm9ybWF0T3B0W10pOiAoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIHJlcGxhY2VDaGFyOiBzdHJpbmcpID0+IHZvaWQge1xuICBjb25zdCBjYXJldFBvc2l0aW9uID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgY29uc3Qga2VlcFBvc3RpdGlvbiA9IGNhcmV0UG9zaXRpb24gIT09IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUubGVuZ3RoO1xuXG4gIGxldCBza2lwRm9ybWF0ID0gaW5wdXRUeXBlSWdub3JlTGlzdC5pbmNsdWRlcyhldmVudC5pbnB1dFR5cGUpO1xuXG4gIGNvbnN0IHNraXBPcHQgPSBnZXRTa2lwT3B0KHNraXBGb3JtYXRPcHRzLCBkaWdpdENoYXJzLCBjYXJldFBvc2l0aW9uKTtcbiAgc2tpcEZvcm1hdCA9IHNraXBPcHQgPT0gdW5kZWZpbmVkID8gc2tpcEZvcm1hdCA6IHNraXBPcHQuc2tpcDtcblxuICByZXR1cm4gKGZvcm1hdFN0cmluZzogc3RyaW5nLCByZXBsYWNlQ2hhcjogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgaWYgKCFza2lwRm9ybWF0KSB7XG4gICAgICB0aGlzLnZhbHVlID0gZm9ybWF0KGRpZ2l0Q2hhcnMsIGZvcm1hdFN0cmluZywgcmVwbGFjZUNoYXIpXG5cbiAgICAgIGlmIChrZWVwUG9zdGl0aW9uKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kID0gY2FyZXRQb3NpdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBwcmV2ZW50cyB0aGUga2V5ZG93biBldmVudCBpZiBkaWdpdENoYXJzIGlzIGF0IG1heGxlbmd0aCBhbmQgYSBudW1lcmljIGlucHV0IHdhcyBhdHRlbXB0ZWRcbiAqIEBwYXJhbSBldmVudFxuICogQHBhcmFtIGRpZ2l0Q2hhcnNcbiAqL1xuZnVuY3Rpb24gaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGlnaXRDaGFyczogc3RyaW5nKTogKGZvcm1hdFN0cmluZzogc3RyaW5nLCByZXBsYWNlQ2hhcjogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlcikgPT4gdm9pZCB7XG4gIHJldHVybiAoZm9ybWF0U3RyaW5nOiBzdHJpbmcsIHJlcGxhY2VDaGFyOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgZGlnaXRLZXkgPSBwYXJzZUludChldmVudC5rZXksIDEwKTtcblxuICAgIGlmIChkaWdpdENoYXJzLmxlbmd0aCA+PSBtYXhMZW5ndGggJiYgIWlzTmFOKGRpZ2l0S2V5KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudmFsdWUgPSBmb3JtYXQoZGlnaXRDaGFycywgZm9ybWF0U3RyaW5nLCByZXBsYWNlQ2hhcik7XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBJbnB1dEZvcm1hdHRlciB7XG4gIG9uOiAoc2VsZWN0b3I/OiBzdHJpbmcpID0+IElucHV0Rm9ybWF0dGVyO1xuICBvZmY6IChzZWxlY3Rvcj86IHN0cmluZykgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElucHV0Rm9ybWF0dGVyKGluaXRPcHRzOiBJbnB1dEZvcm1hdHRlck9wdHMpIHtcblxuICBmdW5jdGlvbiBvbihzZWxlY3Rvcjogc3RyaW5nLCBuZXdPcHRzPzogSW5wdXRGb3JtYXR0ZXJPcHRzKTogSW5wdXRGb3JtYXR0ZXIge1xuICAgIGluaXRPcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgaW5pdE9wdHMsIG5ld09wdHMpO1xuICAgIGNvbnN0IHtmb3JtYXRzLCBza2lwRm9ybWF0T3B0c30gPSBpbml0T3B0cztcbiAgICBjb25zdCByZXBsYWNlQ2hhciA9IGluaXRPcHRzLnJlcGxhY2VDaGFyIHx8ICd4JztcblxuICAgIGNvbnN0IGlucHV0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgY29uc3QgbWF4TGVuZ3RoS2V5cyA9IGdldE1heExlbmd0aEtleXMoZm9ybWF0cyk7XG5cbiAgICBjb25zdCBpbnB1dEhhbmRsZXIgPSAoZXZlbnQ6IElucHV0RXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRpZ2l0Q2hhcnMgPSBnZXREaWdpdENoYXJzKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KTtcbiAgICAgIGNvbnN0IGZvcm1hdCA9IGdldEZvcm1hdChmb3JtYXRzLCBtYXhMZW5ndGhLZXlzLCBkaWdpdENoYXJzKTtcbiAgICAgIGhhbmRsZUlucHV0LmNhbGwoZXZlbnQudGFyZ2V0LCBldmVudCwgZGlnaXRDaGFycywgc2tpcEZvcm1hdE9wdHMpKGZvcm1hdCwgcmVwbGFjZUNoYXIpO1xuICAgIH1cblxuICAgIGNvbnN0IGtleWRvd25IYW5kbGVyID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkaWdpdENoYXJzID0gZ2V0RGlnaXRDaGFycyhldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCk7XG4gICAgICBjb25zdCBmb3JtYXQgPSBnZXRGb3JtYXQoZm9ybWF0cywgbWF4TGVuZ3RoS2V5cywgZGlnaXRDaGFycyk7XG4gICAgICBoYW5kbGVLZXlkb3duLmNhbGwoZXZlbnQudGFyZ2V0LCBldmVudCwgZGlnaXRDaGFycykoZm9ybWF0LCByZXBsYWNlQ2hhciwgbWF4TGVuZ3RoS2V5c1ttYXhMZW5ndGhLZXlzLmxlbmd0aC0xXSk7XG4gICAgfVxuXG4gICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0SGFuZGxlcik7XG4gICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5ZG93bkhhbmRsZXIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG9uKF9zZWxlY3Rvcjogc3RyaW5nID0gc2VsZWN0b3IpOiBJbnB1dEZvcm1hdHRlciB7XG4gICAgICAgIHJldHVybiBvbihfc2VsZWN0b3IpO1xuICAgICAgfSxcbiAgICAgIG9mZigpOiB2b2lkIHtcbiAgICAgICAgaW5wdXRFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0SGFuZGxlcik7XG4gICAgICAgIGlucHV0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge29ufTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=