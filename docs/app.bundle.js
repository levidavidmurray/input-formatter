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
        var replaceChar = initOpts.replaceChar || 'x';
        var skipFormatOpts = initOpts.skipFormatOpts || [];
        var formats = initOpts.formats || {};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4YW1wbGUudHMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3N0eWxlcy5jc3M/ZWEzMyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7OztBQ2xGQSx1QkFBOEI7QUFDOUIscUNBQXVDO0FBRXZDLHNCQUFjLENBQUM7SUFDYixPQUFPLEVBQUU7UUFDUCxD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LElBQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBMEIsQ0FBQyxDQUFDO1lBQ25FLElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzdELGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xILENBQUM7UUFFRCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFcEQsT0FBTztZQUNMLEVBQUUsRUFBRixVQUFHLFNBQTRCO2dCQUE1QixnREFBNEI7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxHQUFHLEVBQUg7Z0JBQ0UsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUN6RCxDQUFDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsT0FBTyxFQUFDLEVBQUUsTUFBQyxDQUFDO0FBQ2QsQ0FBQztBQXhDRCx3Q0F3Q0MiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCAnLi4vcHVibGljL3N0eWxlcy5jc3MnO1xuaW1wb3J0IHtJbnB1dEZvcm1hdHRlcn0gZnJvbSAnLi9pbmRleCc7XG5cbklucHV0Rm9ybWF0dGVyKHtcbiAgZm9ybWF0czoge1xuICAgIDM6ICcoeHh4JyxcbiAgICA2OiAnKHh4eCkgeHh4JyxcbiAgICAxMDogJyh4eHgpIHh4eC14eHh4JyxcbiAgfSxcbn0pLm9uKCcjaW5wdXQnKTtcbiIsInZhciBhcGkgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG52YXIgZXhwb3J0ZWQgPSBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDoge307XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydGVkOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNPbGRJRSA9IGZ1bmN0aW9uIGlzT2xkSUUoKSB7XG4gIHZhciBtZW1vO1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcbiAgICAgIC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcbiAgICAgIC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG4gICAgICBtZW1vID0gQm9vbGVhbih3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59KCk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XG4gIHZhciBtZW1vID0ge307XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbiAgfTtcbn0oKTtcblxudmFyIHN0eWxlc0luRG9tID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5Eb20ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5Eb21baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzSW5Eb20ucHVzaCh7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IGFkZFN0eWxlKG9iaiwgb3B0aW9ucyksXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHZhciBhdHRyaWJ1dGVzID0gb3B0aW9ucy5hdHRyaWJ1dGVzIHx8IHt9O1xuXG4gIGlmICh0eXBlb2YgYXR0cmlidXRlcy5ub25jZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBhdHRyaWJ1dGVzLm5vbmNlID0gbm9uY2U7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KG9wdGlvbnMuaW5zZXJ0IHx8ICdoZWFkJyk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG52YXIgcmVwbGFjZVRleHQgPSBmdW5jdGlvbiByZXBsYWNlVGV4dCgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdO1xuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmoubWVkaWEgPyBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpLmNvbmNhdChvYmouY3NzLCBcIn1cIikgOiBvYmouY3NzOyAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGUsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzcztcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSgnbWVkaWEnKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgYnRvYSkge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGUuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXIgc2luZ2xldG9uQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgc3R5bGU7XG4gIHZhciB1cGRhdGU7XG4gIHZhciByZW1vdmU7XG5cbiAgaWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG4gICAgc3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZSA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlKG9iaik7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4gIC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcblxuICBpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG4gIH1cblxuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ld0xpc3QpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRG9tW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRvbVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRvbS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIqLFxcbjpiZWZvcmUsXFxuOmFmdGVyIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGJhY2tncm91bmQ6ICNlY2VmZjE7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgZm9udC1mYW1pbHk6ICdBbGVvJywgc2VyaWY7XFxufVxcblxcbi5ncm91cCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiAtMTAwcHg7XFxuICAgIG1hcmdpbjogNDVweCAwO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogNzAwcHgpIHtcXG4gICAgLmdyb3VwIHtcXG4gICAgICAgIHRvcDogYXV0bztcXG4gICAgfVxcbn1cXG5cXG50ZXh0YXJlYSB7XFxuICAgIHJlc2l6ZTogbm9uZTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbmlucHV0LFxcbnRleHRhcmVhIHtcXG4gICAgZm9udC1mYW1pbHk6ICdBbGVvJywgc2VyaWY7XFxuICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgIGNvbG9yOiAjOWU5ZTllO1xcbiAgICBmb250LXNpemU6IDEuOGVtO1xcbiAgICBwYWRkaW5nOiAxMHB4IDEwcHggMTBweCA1cHg7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMzIwcHg7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgYm9yZGVyLXJhZGl1czogMDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM5ZTllOWU7XFxufVxcblxcbmlucHV0OmZvY3VzLFxcbnRleHRhcmVhOmZvY3VzIHtcXG4gICAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuaW5wdXQ6Zm9jdXMgfiBsYWJlbCwgaW5wdXQ6dmFsaWQgfiBsYWJlbCxcXG50ZXh0YXJlYTpmb2N1cyB+IGxhYmVsLFxcbnRleHRhcmVhOnZhbGlkIH4gbGFiZWwge1xcbiAgICB0b3A6IC0xNHB4O1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIGNvbG9yOiAjMjE5NkYzO1xcbn1cXG5cXG5pbnB1dDpmb2N1cyB+IC5iYXI6YmVmb3JlLFxcbnRleHRhcmVhOmZvY3VzIH4gLmJhcjpiZWZvcmUge1xcbiAgICB3aWR0aDogMzIwcHg7XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInBhc3N3b3JkXFxcIl0ge1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4zZW07XFxufVxcblxcbmxhYmVsIHtcXG4gICAgY29sb3I6ICM5ZTllOWU7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgbGVmdDogNXB4O1xcbiAgICB0b3A6IDI3cHg7XFxuICAgIHRyYW5zaXRpb246IDMwMG1zIGVhc2UgYWxsO1xcbn1cXG5cXG4uYmFyIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDMyMHB4O1xcbn1cXG5cXG4uYmFyOmJlZm9yZSB7XFxuICAgIGNvbnRlbnQ6ICcnO1xcbiAgICBoZWlnaHQ6IDJweDtcXG4gICAgd2lkdGg6IDA7XFxuICAgIGJvdHRvbTogMHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJhY2tncm91bmQ6ICMyMTk2RjM7XFxuICAgIHRyYW5zaXRpb246IDMwMG1zIGVhc2UgYWxsO1xcbiAgICBsZWZ0OiAwJTtcXG59XFxuXCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8ICcnKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufSIsImltcG9ydCB7SW5wdXRGb3JtYXR0ZXJNYXAsIElucHV0Rm9ybWF0dGVyT3B0cywgU2tpcEZvcm1hdE9wdH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBpbnB1dEZvcm1hdHRlckRlZmF1bHRzID0ge1xuICBmb3JtYXRzOiB7XG4gICAgMzogJyh4eHgnLFxuICAgIDY6ICcoeHh4KSB4eHgnLFxuICAgIDEwOiAnKHh4eCkgeHh4LXh4eHgnLFxuICAgIDExOiAnK3ggKHh4eCkgeHh4LXh4eHgnXG4gIH0sXG4gIHJlcGxhY2VDaGFyOiAneCcsXG4gIHNraXBGb3JtYXRPcHRzOiBbe2xlbmd0aDogMTAsIHBvc2l0aW9uOiAxLCBza2lwOiBmYWxzZX1dLFxufVxuXG5jb25zdCBpbnB1dFR5cGVJZ25vcmVMaXN0ID0gWydkZWxldGVDb250ZW50QmFja3dhcmQnLCAnZGVsZXRlQ29udGVudEZvcndhcmQnXTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIElucHV0Rm9ybWF0dGVyTWFwIGtleXMgaW4gb3JkZXIgb2YgbWF4bGVuZ3RoXG4gKiBAcGFyYW0gZm9ybWF0c1xuICovXG5mdW5jdGlvbiBnZXRNYXhMZW5ndGhLZXlzKGZvcm1hdHM6IElucHV0Rm9ybWF0dGVyTWFwKTogbnVtYmVyW10ge1xuICByZXR1cm4gT2JqZWN0LmtleXMoZm9ybWF0cylcbiAgICAgIC5tYXAoKGtleSkgPT4gcGFyc2VJbnQoa2V5LCAxMCkpXG4gICAgICAuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xufVxuXG4vKipcbiAqIFJldHVybiBhbnkgdXNlci1kZWZpbmVkIHNraXBPcHQgZm9yIHRoZSBjdXJyZW50IGxlbmd0aCBhbmQgcG9zaXRpb25cbiAqIEBwYXJhbSBza2lwRm9ybWF0T3B0c1xuICogQHBhcmFtIGRpZ2l0Q2hhcnNcbiAqIEBwYXJhbSBjdXJQb3NpdGlvblxuICovXG5mdW5jdGlvbiBnZXRTa2lwT3B0KHNraXBGb3JtYXRPcHRzOiBTa2lwRm9ybWF0T3B0W10sIGRpZ2l0Q2hhcnM6IHN0cmluZywgY3VyUG9zaXRpb246IG51bWJlcikge1xuICByZXR1cm4gc2tpcEZvcm1hdE9wdHMuZmluZCgoe2xlbmd0aCwgcG9zaXRpb259KSA9PiB7XG4gICAgcmV0dXJuIGRpZ2l0Q2hhcnMubGVuZ3RoID09PSBsZW5ndGggJiYgY3VyUG9zaXRpb24gPT09IHBvc2l0aW9uO1xuICB9KTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gaW5kZXggb2YgdGhlIG50aCBwYXR0ZXJuIG9jY3VycmVuY2UgaW4gYSBzdHJpbmdcbiAqIEBwYXJhbSBzdHJcbiAqIEBwYXJhbSBwYXR0ZXJuXG4gKiBAcGFyYW0gblxuICovXG5leHBvcnQgZnVuY3Rpb24gbnRoSW5kZXgoc3RyOiBzdHJpbmcsIHBhdHRlcm46IHN0cmluZywgbjogbnVtYmVyKSB7XG4gIGxldCBpID0gLTE7XG4gIHdoaWxlIChuLS0gJiYgaSsrIDwgc3RyLmxlbmd0aCkge1xuICAgIGkgPSBzdHIuaW5kZXhPZihwYXR0ZXJuLCBpKTtcbiAgICBpZiAoaSA8IDApIGJyZWFrO1xuICB9XG4gIHJldHVybiBpO1xufVxuXG4vKipcbiAqIFJldHVybiBvbmx5IHRoZSBudW1iZXIgdmFsdWVzIGZyb20gdGhlIGlucHV0IGVsZW1lbnRcbiAqIEBwYXJhbSBpbnB1dEVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gZ2V0RGlnaXRDaGFycyhpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpOiBzdHJpbmcge1xuICAvLyBUT0RPOiBBbGxvdyBmb3JtYXRzIHdpdGggaGFyZGNvZGVkIGludGVnZXJzXG4gIHJldHVybiBpbnB1dEVsZW1lbnQudmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGV4cGVjdGVkIGZvcm1hdCBmb3IgdGhlIGN1cnJlbnQgbGVuZ3RoIG9mIGRpZ2l0Q2hhcnNcbiAqIEBwYXJhbSBmb3JtYXRzXG4gKiBAcGFyYW0gbWF4TGVuZ3RoS2V5c1xuICogQHBhcmFtIGRpZ2l0Q2hhcnNcbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybWF0KGZvcm1hdHM6IElucHV0Rm9ybWF0dGVyTWFwLCBtYXhMZW5ndGhLZXlzOiBudW1iZXJbXSwgZGlnaXRDaGFyczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGZvcm1hdHNbbWF4TGVuZ3RoS2V5cy5maW5kKChsZW4pID0+IGRpZ2l0Q2hhcnMubGVuZ3RoIDw9IGxlbildO1xufVxuXG4vKipcbiAqIE1hcCBkaWdpdENoYXJzIG51bWJlciB2YWx1ZXMgdG8gdGhlIGV4cGVjdGVkIGZvcm1hdCBmb3IgdGhlIGN1cnJlbnQgbGVuZ3RoXG4gKiBAcGFyYW0gZGlnaXRDaGFyc1xuICogQHBhcmFtIGZvcm1hdFN0cmluZ1xuICogQHBhcmFtIHJlcGxhY2VDaGFyXG4gKi9cbi8vIFRPRE86IE1vZGlmeWluZyBpbm5lciB2YWx1ZXMgd2hlbiB0aGUgbmV4dCB2YWx1ZSBjYXVzZXMgYSBmb3JtYXQgc2hpZnQgYnJlYWtzIHRoaW5nc1xuZnVuY3Rpb24gZm9ybWF0KGRpZ2l0Q2hhcnM6IHN0cmluZywgZm9ybWF0U3RyaW5nOiBzdHJpbmcsIHJlcGxhY2VDaGFyOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoZGlnaXRDaGFycy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gbnRoSW5kZXgoZm9ybWF0U3RyaW5nLCByZXBsYWNlQ2hhciwgZGlnaXRDaGFycy5sZW5ndGgpO1xuICAgIGZvcm1hdFN0cmluZyA9IGZvcm1hdFN0cmluZy5zdWJzdHJpbmcoMCwgbGFzdEluZGV4ICsgMSk7XG5cbiAgICBsZXQgaSA9IDA7XG5cbiAgICByZXR1cm4gZm9ybWF0U3RyaW5nLnNwbGl0KCcnKS5tYXAoKGNoYXIpID0+IHtcbiAgICAgIGlmIChjaGFyID09PSByZXBsYWNlQ2hhcikge1xuICAgICAgICBjaGFyID0gZGlnaXRDaGFyc1tpXTtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNoYXI7XG4gICAgfSkuam9pbignJyk7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5wdXQgZXZlbnQgc2hvdWxkIGZvcm1hdCB0aGUgY3VycmVudCB2YWx1ZSwgYW5kIHJldHVybnMgYSBmb3JtYXR0ZXIgY2FsbGJhY2tcbiAqIEBwYXJhbSBldmVudFxuICogQHBhcmFtIGRpZ2l0Q2hhcnNcbiAqIEBwYXJhbSBza2lwRm9ybWF0T3B0c1xuICovXG5mdW5jdGlvbiBoYW5kbGVJbnB1dChldmVudDogSW5wdXRFdmVudCwgZGlnaXRDaGFyczogc3RyaW5nLCBza2lwRm9ybWF0T3B0czogU2tpcEZvcm1hdE9wdFtdKTogKGZvcm1hdFN0cmluZzogc3RyaW5nLCByZXBsYWNlQ2hhcjogc3RyaW5nKSA9PiB2b2lkIHtcbiAgY29uc3QgY2FyZXRQb3NpdGlvbiA9IHRoaXMuc2VsZWN0aW9uU3RhcnQ7XG4gIGNvbnN0IGtlZXBQb3N0aXRpb24gPSBjYXJldFBvc2l0aW9uICE9PSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLmxlbmd0aDtcblxuICBsZXQgc2tpcEZvcm1hdCA9IGlucHV0VHlwZUlnbm9yZUxpc3QuaW5jbHVkZXMoZXZlbnQuaW5wdXRUeXBlKTtcblxuICBjb25zdCBza2lwT3B0ID0gZ2V0U2tpcE9wdChza2lwRm9ybWF0T3B0cywgZGlnaXRDaGFycywgY2FyZXRQb3NpdGlvbik7XG4gIHNraXBGb3JtYXQgPSBza2lwT3B0ID09IHVuZGVmaW5lZCA/IHNraXBGb3JtYXQgOiBza2lwT3B0LnNraXA7XG5cbiAgcmV0dXJuIChmb3JtYXRTdHJpbmc6IHN0cmluZywgcmVwbGFjZUNoYXI6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGlmICghc2tpcEZvcm1hdCkge1xuICAgICAgdGhpcy52YWx1ZSA9IGZvcm1hdChkaWdpdENoYXJzLCBmb3JtYXRTdHJpbmcsIHJlcGxhY2VDaGFyKVxuXG4gICAgICBpZiAoa2VlcFBvc3RpdGlvbikge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZCA9IGNhcmV0UG9zaXRpb247XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgcHJldmVudHMgdGhlIGtleWRvd24gZXZlbnQgaWYgZGlnaXRDaGFycyBpcyBhdCBtYXhsZW5ndGggYW5kIGEgbnVtZXJpYyBpbnB1dCB3YXMgYXR0ZW1wdGVkXG4gKiBAcGFyYW0gZXZlbnRcbiAqIEBwYXJhbSBkaWdpdENoYXJzXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRpZ2l0Q2hhcnM6IHN0cmluZyk6IChmb3JtYXRTdHJpbmc6IHN0cmluZywgcmVwbGFjZUNoYXI6IHN0cmluZywgbWF4TGVuZ3RoOiBudW1iZXIpID0+IHZvaWQge1xuICByZXR1cm4gKGZvcm1hdFN0cmluZzogc3RyaW5nLCByZXBsYWNlQ2hhcjogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGRpZ2l0S2V5ID0gcGFyc2VJbnQoZXZlbnQua2V5LCAxMCk7XG5cbiAgICBpZiAoZGlnaXRDaGFycy5sZW5ndGggPj0gbWF4TGVuZ3RoICYmICFpc05hTihkaWdpdEtleSkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnZhbHVlID0gZm9ybWF0KGRpZ2l0Q2hhcnMsIGZvcm1hdFN0cmluZywgcmVwbGFjZUNoYXIpO1xuICAgIH1cbiAgfVxufVxuXG5pbnRlcmZhY2UgSW5wdXRGb3JtYXR0ZXIge1xuICBvbjogKHNlbGVjdG9yPzogc3RyaW5nKSA9PiBJbnB1dEZvcm1hdHRlcjtcbiAgb2ZmOiAoc2VsZWN0b3I/OiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbnB1dEZvcm1hdHRlcihpbml0T3B0czogSW5wdXRGb3JtYXR0ZXJPcHRzKSB7XG5cbiAgZnVuY3Rpb24gb24oc2VsZWN0b3I6IHN0cmluZywgbmV3T3B0cz86IElucHV0Rm9ybWF0dGVyT3B0cyk6IElucHV0Rm9ybWF0dGVyIHtcbiAgICBpbml0T3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIGluaXRPcHRzLCBuZXdPcHRzKTtcblxuICAgIGNvbnN0IHJlcGxhY2VDaGFyID0gaW5pdE9wdHMucmVwbGFjZUNoYXIgfHwgJ3gnO1xuICAgIGNvbnN0IHNraXBGb3JtYXRPcHRzID0gaW5pdE9wdHMuc2tpcEZvcm1hdE9wdHMgfHwgW107XG4gICAgY29uc3QgZm9ybWF0cyA9IGluaXRPcHRzLmZvcm1hdHMgfHwge307XG5cbiAgICBjb25zdCBpbnB1dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgIGNvbnN0IG1heExlbmd0aEtleXMgPSBnZXRNYXhMZW5ndGhLZXlzKGZvcm1hdHMpO1xuXG4gICAgY29uc3QgaW5wdXRIYW5kbGVyID0gKGV2ZW50OiBJbnB1dEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkaWdpdENoYXJzID0gZ2V0RGlnaXRDaGFycyhldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCk7XG4gICAgICBjb25zdCBmb3JtYXQgPSBnZXRGb3JtYXQoZm9ybWF0cywgbWF4TGVuZ3RoS2V5cywgZGlnaXRDaGFycyk7XG4gICAgICBoYW5kbGVJbnB1dC5jYWxsKGV2ZW50LnRhcmdldCwgZXZlbnQsIGRpZ2l0Q2hhcnMsIHNraXBGb3JtYXRPcHRzKShmb3JtYXQsIHJlcGxhY2VDaGFyKTtcbiAgICB9XG5cbiAgICBjb25zdCBrZXlkb3duSGFuZGxlciA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZGlnaXRDaGFycyA9IGdldERpZ2l0Q2hhcnMoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xuICAgICAgY29uc3QgZm9ybWF0ID0gZ2V0Rm9ybWF0KGZvcm1hdHMsIG1heExlbmd0aEtleXMsIGRpZ2l0Q2hhcnMpO1xuICAgICAgaGFuZGxlS2V5ZG93bi5jYWxsKGV2ZW50LnRhcmdldCwgZXZlbnQsIGRpZ2l0Q2hhcnMpKGZvcm1hdCwgcmVwbGFjZUNoYXIsIG1heExlbmd0aEtleXNbbWF4TGVuZ3RoS2V5cy5sZW5ndGgtMV0pO1xuICAgIH1cblxuICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dEhhbmRsZXIpO1xuICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleWRvd25IYW5kbGVyKTtcblxuICAgIHJldHVybiB7XG4gICAgICBvbihfc2VsZWN0b3I6IHN0cmluZyA9IHNlbGVjdG9yKTogSW5wdXRGb3JtYXR0ZXIge1xuICAgICAgICByZXR1cm4gb24oX3NlbGVjdG9yKTtcbiAgICAgIH0sXG4gICAgICBvZmYoKTogdm9pZCB7XG4gICAgICAgIGlucHV0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dEhhbmRsZXIpO1xuICAgICAgICBpbnB1dEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlkb3duSGFuZGxlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtvbn07XG59XG4iXSwic291cmNlUm9vdCI6IiJ9