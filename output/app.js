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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test_hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test.hello */ \"./test.hello\");\n/* harmony import */ var _test_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test.ts */ \"./test.ts\");\n/* harmony import */ var _test_ts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_test_ts__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _static_img_img_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./static/img/img.jpg */ \"./static/img/img.jpg\");\n/* harmony import */ var _static_img_img_jpg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_static_img_img_jpg__WEBPACK_IMPORTED_MODULE_2__);\n// 尝试 显示文件中的内容\r\n\r\n\r\n// 引入图片\r\n\r\nvar img = new Image()\r\nimg.src = _static_img_img_jpg__WEBPACK_IMPORTED_MODULE_2___default.a;\r\ndocument.getElementById('mydiv').appendChild(img)\r\n\r\n\r\n\r\nfunction test1 () {\r\n\tlet element = document.getElementById('app')\r\n\t\r\n\telement.innerHTML = _test_hello__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n}\r\n\r\ntest1()\r\n\r\n// 取出console.log()\r\nvar a = 123\r\nvar c = 2333\r\n\r\n\r\nalert(9)\r\nfunction  test2 () { \r\n\tlet element = document.getElementById('app')\r\n\t\telement.innerHTML = element.innerHTML + ' ' + c\r\n}\r\n \r\ntest2()\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./main.js?");

/***/ }),

/***/ "./static/img/img.jpg":
/*!****************************!*\
  !*** ./static/img/img.jpg ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected character '�' (1:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n(Source code omitted for this binary file)\");\n\n//# sourceURL=webpack:///./static/img/img.jpg?");

/***/ }),

/***/ "./test.hello":
/*!********************!*\
  !*** ./test.hello ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"这个自己写的load .hello是因为说明webpack可以识别\"); \n\n//# sourceURL=webpack:///./test.hello?");

/***/ }),

/***/ "./test.ts":
/*!*****************!*\
  !*** ./test.ts ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var hello = 'Hello World!';\r\nconsole.log(hello);\r\n\n\n//# sourceURL=webpack:///./test.ts?");

/***/ })

/******/ });