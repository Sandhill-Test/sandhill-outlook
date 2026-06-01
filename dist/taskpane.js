/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/taskpane/WYSIWYGeditor.js":
/*!***************************************!*\
  !*** ./src/taskpane/WYSIWYGeditor.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var tinymce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tinymce */ "./node_modules/tinymce/tinymce.js");
/* harmony import */ var tinymce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tinymce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tinymce_skins_ui_oxide_skin_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tinymce/skins/ui/oxide/skin.min.css */ "./node_modules/tinymce/skins/ui/oxide/skin.min.css");
/* harmony import */ var tinymce_skins_ui_oxide_skin_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tinymce_skins_ui_oxide_skin_min_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tinymce_icons_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tinymce/icons/default */ "./node_modules/tinymce/icons/default/index.js");
/* harmony import */ var tinymce_icons_default__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tinymce_icons_default__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinymce/themes/silver */ "./node_modules/tinymce/themes/silver/index.js");
/* harmony import */ var tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tinymce_models_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tinymce/models/dom */ "./node_modules/tinymce/models/dom/index.js");
/* harmony import */ var tinymce_models_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tinymce_models_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tinymce_plugins_advlist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tinymce/plugins/advlist */ "./node_modules/tinymce/plugins/advlist/index.js");
/* harmony import */ var tinymce_plugins_advlist__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_advlist__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tinymce_plugins_code__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tinymce/plugins/code */ "./node_modules/tinymce/plugins/code/index.js");
/* harmony import */ var tinymce_plugins_code__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_code__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var tinymce_plugins_emoticons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tinymce/plugins/emoticons */ "./node_modules/tinymce/plugins/emoticons/index.js");
/* harmony import */ var tinymce_plugins_emoticons__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_emoticons__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var tinymce_plugins_emoticons_js_emojis__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tinymce/plugins/emoticons/js/emojis */ "./node_modules/tinymce/plugins/emoticons/js/emojis.js");
/* harmony import */ var tinymce_plugins_emoticons_js_emojis__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_emoticons_js_emojis__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tinymce/plugins/link */ "./node_modules/tinymce/plugins/link/index.js");
/* harmony import */ var tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var tinymce_plugins_lists__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tinymce/plugins/lists */ "./node_modules/tinymce/plugins/lists/index.js");
/* harmony import */ var tinymce_plugins_lists__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_lists__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var tinymce_plugins_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tinymce/plugins/table */ "./node_modules/tinymce/plugins/table/index.js");
/* harmony import */ var tinymce_plugins_table__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_table__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var tinymce_plugins_help__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tinymce/plugins/help */ "./node_modules/tinymce/plugins/help/index.js");
/* harmony import */ var tinymce_plugins_help__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_help__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var tinymce_plugins_help_js_i18n_keynav_en__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tinymce/plugins/help/js/i18n/keynav/en */ "./node_modules/tinymce/plugins/help/js/i18n/keynav/en.js");
/* harmony import */ var tinymce_plugins_help_js_i18n_keynav_en__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_help_js_i18n_keynav_en__WEBPACK_IMPORTED_MODULE_13__);
/* Import TinyMCE */


/* Skin CSS — bundled via webpack to avoid MIME type issues with devServer */


/* Default icons are required. After that, import custom icons if applicable */


/* Required TinyMCE components */



/* Import plugins */










/* Initialize TinyMCE */
function render() {
  tinymce__WEBPACK_IMPORTED_MODULE_0___default().init({
    selector: "textarea#basic-example",
    plugins: "advlist code emoticons link lists table help",
    license_key: "gpl",
    toolbar: "bold italic | bullist numlist | link emoticons",
    base_url: "/tinymce",
    suffix: ".min",
    skin: false
  });
}

/***/ }),

/***/ "./src/taskpane/format.js":
/*!********************************!*\
  !*** ./src/taskpane/format.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyFormat: function() { return /* binding */ applyFormat; },
/* harmony export */   initFormatButtons: function() { return /* binding */ initFormatButtons; },
/* harmony export */   sentenceCase: function() { return /* binding */ sentenceCase; },
/* harmony export */   syncFormatButtons: function() { return /* binding */ syncFormatButtons; }
/* harmony export */ });
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global document */
// TODO: FONT SIZE DROP DOWNS
// FIXME: INSERT IMAGE COMMAND NEEDS A URL TO FUNCTION PROPERLY
/**
 * @module Formatting
 * @description Toolbar formatting commands and WYSIWYG editor setup.
 */

/**
 * Executes a formatting command on the solution editor via `document.execCommand` and syncs toolbar button states.
 * @param {string} command - A valid `document.execCommand` command string (e.g. `"bold"`, `"italic"`)
 * @param {HTMLElement} formSolution - The contenteditable element to refocus after applying the command
 * @returns {void}
 */
function applyFormat(command, formSolution) {
  document.execCommand(command, false, null);
  formSolution.focus();
  syncFormatButtons();
}
/**
 * Maps toolbar button element IDs to their corresponding `document.execCommand` command strings.
 * @type {Object.<string, string>}
 */
var map = {
  "bold-btn": "bold",
  "italic-btn": "italic",
  "underline-btn": "underline",
  "strike-btn": "strikethrough",
  "list-btn": "insertUnorderedList",
  "ordered-list-btn": "insertOrderedList",
  "pic-btn": "insertImage",
  "fontsize-btn": "fontSize"
};
/**
 * Queries the current editor format state and updates each toolbar button's `data-active` attribute
 * to reflect whether that format is currently active at the cursor position.
 * @returns {void}
 */
function syncFormatButtons() {
  Object.entries(map).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      btnId = _ref2[0],
      cmd = _ref2[1];
    document.getElementById(btnId).dataset.active = document.queryCommandState(cmd) ? "true" : "false";
  });
}
// FIXME: IMPORTANT. FIX THIS!!!!!!!
/**
 * Attaches all toolbar button click handlers, keyboard shortcuts (Tab → indent),
 * and auto-capitalisation logic to the WYSIWYG solution editor element.
 * @param {HTMLElement} formSolution - The contenteditable element acting as the WYSIWYG editor
 * @returns {void}
 */
function initFormatButtons(formSolution) {
  var fmt = function fmt(cmd) {
    return applyFormat(cmd, formSolution);
  };
  Object.entries(map).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      btnId = _ref4[0],
      cmd = _ref4[1];
    document.getElementById(btnId).onclick = function () {
      return fmt(cmd);
    };
  });
  var listBtn = document.getElementById("list-btn");
  var orderedListBtn = document.getElementById("ordered-list-btn");
  formSolution.addEventListener("keyup", syncFormatButtons);
  formSolution.addEventListener("mouseup", syncFormatButtons);
  formSolution.addEventListener("keydown", function (event) {
    if (event.code === "Tab") {
      event.preventDefault();
      fmt("indent");
      // fmt("insertUnorderedList");
      // const inList = listBtn.dataset.active === "true" || orderedListBtn.dataset.active === "true";
      // if (inList) {
      //   fmt(event.shiftKey || event.key === "Backspace" ? "outdent" : "indent");
      // }
    }
  });

  // affects bolds - fix later
  formSolution.addEventListener("input", function (e) {
    if (e.inputType !== "insertText" || !e.data || !/[a-z]/.test(e.data)) return;
    var sel = window.getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    var node = range.startContainer;
    if (node.nodeType !== Node.TEXT_NODE) return;
    var beforeTyped = node.textContent.slice(0, range.startOffset - 1);
    if (/[.!?]\s$/.test(beforeTyped) || beforeTyped === "") {
      document.execCommand("delete", false);
      document.execCommand("insertText", false, e.data.toUpperCase());
    }
  });
}
// Source - https://stackoverflow.com/a/40669242
// Posted by haxxxton, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-21, License - CC BY-SA 3.0
// TODO: decide whether to remove this or not. i dont think i used this function
/**
 * Converts a string so that the first letter of each sentence is capitalised.
 * @param {string} input - The string to convert
 * @param {boolean} [lowercaseBefore=false] - If `true`, lowercases the entire string before applying sentence casing
 * @returns {string} The sentence-cased string
 */
function sentenceCase(input, lowercaseBefore) {
  input = input === undefined || input === null ? "" : input;
  if (lowercaseBefore) {
    input = input.toLowerCase();
  }
  return input.toString().replace(/(^|[.!?]\s+|\n)([a-z])/g, function (match, separator, char) {
    return separator + char.toUpperCase();
  });
}

// shift =

/***/ }),

/***/ "./src/taskpane/taskpane.js":
/*!**********************************!*\
  !*** ./src/taskpane/taskpane.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./src/taskpane/format.js");
/* harmony import */ var _WYSIWYGeditor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WYSIWYGeditor.js */ "./src/taskpane/WYSIWYGeditor.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, localStorage */
/**
 * @module taskpane
 * @description Main taskpane - data fetchng, page rendering, and navigation
 */


/* Import the default skin (oxide). Replace with a custom skin if required. */
// import "tinymce/skins/ui/oxide/skin.css";

// WARNING!!!!  WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!!

// I HAVE USED execCommand() FOR THE TEXT EDITOR. HTML5 HAS RENDERED THIS METHOD AS OBSOLETE AND MULTIPLE BROWSERS ARE MOVING AWAY FROM THIS.
// HOWEVER OUTLOOK ADD IN USES CHROMIUM BROWSER BY DEFAULT AND THE METHOD HAS NOT DEPRECATED COMPLETELY
// SINCE HTML5 ARE LIARS AND CANNOT MAKE UP THEIR MIND, THERE'S NO CURRENT ALTERNATIVE TO THIS DAY (MAY 2026). A DECADE HAS PASSED AND DEVS RELY ON REACT JS OR NODE PACKAGES TO CREATE THIS.
// ***HOWEVER*** IM USING VANILLA JS - NO PACKAGES - SO MY ONLY CHOICE IS CAPTURING EVERY SINGLE KEYUP/DOWN EVENT OR USE THE CONTENTEDITABLE ATTRIBUTE. I DO NOT WANT TO DO THE FORMER, SO I'M STICKING WITH THE CONTENTEDITABLE + execCommand() COMBO.
// IF THE TEXT AREA STOPS REGISTERING BOLD FONT, UNDERLINES ETC. THIS MEANS THAT MY applyFormat() FUCNTION IS OBSOLETE AND YOU WILL NEED TO USE REACT JS TO GET A WORKING WYSIWYG TEXT EDITOR. ALSO REMEMBER TO HOOK THIS UP WITH THE CONN.JS FILE SO CHANEGS CAN BE APPENDED TO THE DATABASE.

// WARNING!!!!  WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!! WARNING!!!!

// TODO: do smth about the back btn function cuz it works quite sloppy when editing and pressing back - check if i did smth about it cuz i cant remember

// add a delete article function?

/** @type {Array<Object>} Contains every subpage fetched from the database */
var allSubpages = [];

/** @type {Array<Object>} Contains every page fetched from the database */
var allPages = [];

/** @type {Array<Object>} Contains every pinned subpage fetched from the database */
var pinnedSubpages = [];

/** @type {number|null} Tracks which page is currently open; null if none */
var currentPageId = null;

/** @type {number|null} Tracks which subpage is currently open; null if none */
var currentSubpageId = null;

// testing
function printPinned() {
  return _printPinned.apply(this, arguments);
}
/**
 * Collects data from the Pages and Subpage tables in the database using the Fetch API.
 * Retries the connection up to `retries` times before logging an error. On success, calls {@link renderResults}.
 * @async
 * @param {number} [retries=7] - The number of connection attempts before giving up
 * @param {number} [delay=2000] - The wait between each attempt in milliseconds
 * @returns {Promise<void>}
 */
function _printPinned() {
  _printPinned = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var res, pinnedPgs, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return fetch("https://localhost:3001/api/subpages/pin");
        case 1:
          res = _context.v;
          if (res.ok) {
            _context.n = 2;
            break;
          }
          throw new Error("pinned Subpage not found");
        case 2:
          _context.n = 3;
          return res.json();
        case 3:
          pinnedPgs = _context.v;
          pinnedSubpages = pinnedPgs;
          console.log(pinnedPgs);
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.error("Failed to load subpage:", _t);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[0, 4]]);
  }));
  return _printPinned.apply(this, arguments);
}
function testConnection() {
  return _testConnection.apply(this, arguments);
}
/**
 * Renders the list of pages and their top subpages on the main view.
 * Each page is shown with up to 3 of its subpages listed beneath it.
 * @param {Array<Object>} pages - Array of page objects from the database
 * @param {Array<Object>} subpages - Array of subpage objects from the database
 * @returns {void}
 */
function _testConnection() {
  _testConnection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var retries,
      delay,
      i,
      _yield$Promise$all,
      _yield$Promise$all2,
      pagesRes,
      subpagesRes,
      pages,
      subpages,
      _args2 = arguments,
      _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          retries = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 7;
          delay = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 2000;
          i = 0;
        case 1:
          if (!(i < retries)) {
            _context2.n = 8;
            break;
          }
          _context2.p = 2;
          _context2.n = 3;
          return Promise.all([fetch("https://localhost:3001/api/pages"), fetch("https://localhost:3001/api/subpages")]);
        case 3:
          _yield$Promise$all = _context2.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          pagesRes = _yield$Promise$all2[0];
          subpagesRes = _yield$Promise$all2[1];
          _context2.n = 4;
          return pagesRes.json();
        case 4:
          pages = _context2.v;
          _context2.n = 5;
          return subpagesRes.json();
        case 5:
          subpages = _context2.v;
          allSubpages = subpages;
          allPages = pages;

          // checking if the data has been correctly appended to the arrays
          console.log("Pages:", pages);
          console.log("Subpages:", subpages);
          printPinned();
          renderResults(pages, subpages);
          return _context2.a(2);
        case 6:
          _context2.p = 6;
          _t2 = _context2.v;
          console.warn("Connection attempt ".concat(i + 1, " of ").concat(retries, " failed. Retrying in ").concat(delay / 1000, "s..."));
          _context2.n = 7;
          return new Promise(function (res) {
            return setTimeout(res, delay);
          });
        case 7:
          i++;
          _context2.n = 1;
          break;
        case 8:
          console.error("Could not connect to server after multiple attempts.");
        case 9:
          return _context2.a(2);
      }
    }, _callee2, null, [[2, 6]]);
  }));
  return _testConnection.apply(this, arguments);
}
function renderResults(pages, subpages) {
  var mainListUl = document.getElementById("main-list-ul");
  mainListUl.innerHTML = "";

  // ignores the main menu page (it's id = 1)
  pages.forEach(function (page) {
    if (page.Id == 1) return;
    var hrefUtil = "#page-".concat(page.Id);
    var pageSubpages = subpages.filter(function (sp) {
      return sp.parentpg == page.Id;
    });
    var topSubpage = pageSubpages.slice(0, 3); //only shows the first 3 articles

    // creating the design for each section on the main page
    var subItems = topSubpage.map(function (sp) {
      return "<li><a href=\"".concat(sp.Id != null ? "#subpage-" + sp.Id : "", "\">").concat(sp.title, "</a></li>");
    }).join("");
    var listIcon = page.Id == 2 ? "ms-Icon--Ribbon" : page.Id == 3 ? "ms-Icon--Repo" : page.Id == 4 ? "ms-Icon--WorkFlow" : "ms-Icon--Cancel";
    var mainListLi = "\n      <li class=\"main-listitem\">\n        <div class=\"ms-ListItem\">\n          <i class=\"ms-Icon ".concat(listIcon, " ms-font-xl\"></i>\n          <span class=\"ms-font-m\">\n            <a href=\"").concat(hrefUtil, "\">").concat(page.name, "</a>\n            <ul class=\"sub-listitem\">").concat(subItems, "</ul>\n          </span>\n        </div>\n      </li>\n    ");
    mainListUl.insertAdjacentHTML("beforeend", mainListLi);
  });
}

/**
 * Fetches a single subpage record from the API by its ID.
 * @async
 * @param {number} id - The ID of the subpage to fetch
 * @returns {Promise<Object|undefined>} The subpage object, or `undefined` if the request fails
 */
function subpageFetchUtil(_x) {
  return _subpageFetchUtil.apply(this, arguments);
} // FIXME: lol the search bar dont work for now.... probs will remove it later
/**
 * Renders the list view for a given page, displaying all of its subpages.
 * Updates {@link currentPageId} and switches to the `searchpage-view`.
 * @async
 * @param {number} id - The ID of the parent page to display
 * @returns {Promise<void>}
 */
function _subpageFetchUtil() {
  _subpageFetchUtil = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
    var res, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return fetch("https://localhost:3001/api/subpages/".concat(id));
        case 1:
          res = _context3.v;
          if (res.ok) {
            _context3.n = 2;
            break;
          }
          throw new Error("Subpage not found");
        case 2:
          _context3.n = 3;
          return res.json();
        case 3:
          return _context3.a(2, _context3.v);
        case 4:
          _context3.p = 4;
          _t3 = _context3.v;
          console.error("Failed to load subpage:", _t3);
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 4]]);
  }));
  return _subpageFetchUtil.apply(this, arguments);
}
function renderSearchList(_x2) {
  return _renderSearchList.apply(this, arguments);
}
/**
 * Fetches and renders a subpage in the subpage view by its ID.
 * Populates all content fields (title, description, symptoms, solution, image),
 * and wires up the edit button and additional-info dialog.
 * @async
 * @param {number} id - The ID of the subpage to render
 * @returns {Promise<void>}
 */
function _renderSearchList() {
  _renderSearchList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id) {
    var _page$name, subpages, page, listContainer;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          try {
            currentPageId = id;
            subpages = allSubpages.filter(function (sp) {
              return sp.parentpg == id;
            });
            console.log(subpages);
            page = allPages.find(function (p) {
              return p.Id == id;
            });
            document.getElementById("main-title-el").innerText = (_page$name = page === null || page === void 0 ? void 0 : page.name) !== null && _page$name !== void 0 ? _page$name : "";
            showView("searchpage-view");
            listContainer = document.getElementById("searchpage-list-container");
            listContainer.innerHTML = "";
            subpages.forEach(function (subpage) {
              var subPgList = "<li><a href=\"".concat(subpage.Id != null ? "#subpage-" + subpage.Id : "", "\">").concat(subpage.title, "</a></li>");
              var subPgUl = "<ul class=\"sub-listitem\">".concat(subPgList, "</ul>");
              listContainer.insertAdjacentHTML("beforeend", subPgUl);
            });
          } catch (err) {}
        case 1:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return _renderSearchList.apply(this, arguments);
}
function renderSubpage(_x3) {
  return _renderSubpage.apply(this, arguments);
}
function _renderSubpage() {
  _renderSubpage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(id) {
    var _subpage$title2, _subpage$description2, subpage, sympWrapper, sympEl, solWrapper, solEl, imgEl, additionalFields, dialogData, pinIcon, _t4;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          currentSubpageId = id;
          _context5.n = 1;
          return subpageFetchUtil(id);
        case 1:
          subpage = _context5.v;
          document.getElementById("title-el").innerText = (_subpage$title2 = subpage.title) !== null && _subpage$title2 !== void 0 ? _subpage$title2 : "";
          document.getElementById("desc-el").innerText = (_subpage$description2 = subpage.description) !== null && _subpage$description2 !== void 0 ? _subpage$description2 : "";
          sympWrapper = document.getElementById("symp-wrapper");
          sympEl = document.getElementById("symptoms-el");
          if (subpage.symptom) {
            sympEl.innerText = subpage.symptom;
            sympWrapper.classList.remove("hidden");
            sympWrapper.classList.add("wrapper");
          } else {
            sympWrapper.classList.add("hidden");
            sympWrapper.classList.remove("wrapper");
          }
          solWrapper = document.getElementById("sol-wrapper");
          solEl = document.getElementById("solution-el");
          if (subpage.solution) {
            solEl.innerHTML = subpage.solution;
            solWrapper.classList.remove("hidden");
            // solWrapper.classList.add("wrapper");
          } else {
            solWrapper.classList.add("hidden");
            // solWrapper.classList.remove("wrapper");
          }
          imgEl = document.getElementById("img-el");
          if (subpage.img) {
            imgEl.src = subpage.img;
            imgEl.style.display = "block";
          } else {
            imgEl.style.display = "none";
          }

          // TODO: Update dates
          // additional fields - supposed to open up another panel or smth. TODO: might do smth similar for the edit functions idk yet
          additionalFields = [{
            key: "product",
            label: "Product"
          }, {
            key: "created_on",
            label: "Date"
          }, {
            key: "last_update",
            label: "Last Update"
          }, {
            key: "topic",
            label: "Topic"
          }, {
            key: "officialpg_link",
            label: "Official Page",
            isLink: true
          }];
          dialogData = additionalFields.filter(function (_ref) {
            var key = _ref.key;
            return subpage[key];
          }).map(function (_ref2) {
            var key = _ref2.key,
              label = _ref2.label,
              isLink = _ref2.isLink;
            return {
              label: label,
              value: subpage[key],
              isLink: !!isLink
            };
          });
          document.getElementById("edit-btn").onclick = function () {
            return showFormView("edit", subpage);
          };
          document.getElementById("additional-info").onclick = function () {
            localStorage.setItem("additionalInfoData", JSON.stringify(dialogData));
            Office.context.ui.displayDialogAsync("".concat(window.location.origin, "/additional-info-dialog.html"), {
              height: 40,
              width: 30
            }, function (asyncResult) {
              if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                console.error("Dialog failed:", asyncResult.error.message);
                return;
              }
              var dialog = asyncResult.value;
              dialog.addEventHandler(Office.EventType.DialogMessageReceived, function () {
                dialog.close();
              });
            });
          };
          pinIcon = document.getElementById("pin-icon");
          pinIcon.className = "ms-Icon ".concat(subpage.is_pinned ? "ms-Icon--PinnedSolid" : "ms-Icon--Pinned", " ms-font-xl");
          document.getElementById("pin-btn").onclick = function () {
            return pinSubpg(id);
          };
          showView("subpage-view");
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t4 = _context5.v;
          console.error("Failed to load subpage:", _t4);
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return _renderSubpage.apply(this, arguments);
}
function pinSubpg(_x4) {
  return _pinSubpg.apply(this, arguments);
}
/**
 * Clears the URL hash, triggering the `hashchange` event to navigate back to the main view.
 * @returns {void}
 */
function _pinSubpg() {
  _pinSubpg = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id) {
    var res, updated, pinned, pinIcon, _t5;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return fetch("https://localhost:3001/api/subpages/".concat(id, "/pin"), {
            method: "PATCH"
          });
        case 1:
          res = _context6.v;
          if (res.ok) {
            _context6.n = 2;
            break;
          }
          throw new Error("failed to toggle pin");
        case 2:
          _context6.n = 3;
          return res.json();
        case 3:
          updated = _context6.v;
          pinned = !!updated.is_pinned;
          pinIcon = document.getElementById("pin-icon");
          pinIcon.className = "ms-Icon ".concat(pinned ? "ms-Icon--PinnedSolid" : "ms-Icon--Pinned", " ms-font-xl");
          _context6.n = 5;
          break;
        case 4:
          _context6.p = 4;
          _t5 = _context6.v;
          console.error("pin toggle failed", _t5);
        case 5:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 4]]);
  }));
  return _pinSubpg.apply(this, arguments);
}
function backButton() {
  window.location.hash = "";
}

/**
 * Shows the specified view element and hides all others.
 * @param {"main-view"|"searchpage-view"|"subpage-view"|"form-view"} viewId - The ID of the view to show
 * @returns {void}
 */
function showView(viewId) {
  ["main-view", "searchpage-view", "subpage-view", "form-view"].forEach(function (id) {
    document.getElementById(id).style.display = id === viewId ? "block" : "none";
  });
}

/**
 * Convenience wrapper that switches the display to the main view.
 * @returns {void}
 */
function showMainView() {
  showView("main-view");
}

/** @type {HTMLElement} The contenteditable element used as the WYSIWYG solution editor */
var formSolution = document.getElementById("form-solution");

/**
 * Populates and displays the add/edit form view.
 * Sets all form fields from the given subpage object (if editing) and wires up the submit and back buttons.
 * @param {"add"|"edit"} mode - Whether the form is for adding a new entry or editing an existing one
 * @param {Object|null} [subpage=null] - The subpage object to pre-populate form fields with (used in "edit" mode)
 * @returns {void}
 */
function showFormView(mode) {
  var _subpage$title, _subpage$description, _subpage$symptom, _subpage$solution, _subpage$product, _subpage$topic, _subpage$officialpg_l, _subpage$img;
  var subpage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  document.getElementById("form-title-el").innerText = mode === "edit" ? "Edit Entry" : "Add Entry";
  document.getElementById("form-title").value = (_subpage$title = subpage === null || subpage === void 0 ? void 0 : subpage.title) !== null && _subpage$title !== void 0 ? _subpage$title : "";
  document.getElementById("form-description").value = (_subpage$description = subpage === null || subpage === void 0 ? void 0 : subpage.description) !== null && _subpage$description !== void 0 ? _subpage$description : "";
  document.getElementById("form-symptom").value = (_subpage$symptom = subpage === null || subpage === void 0 ? void 0 : subpage.symptom) !== null && _subpage$symptom !== void 0 ? _subpage$symptom : "";
  formSolution.innerHTML = (_subpage$solution = subpage === null || subpage === void 0 ? void 0 : subpage.solution) !== null && _subpage$solution !== void 0 ? _subpage$solution : "";
  document.getElementById("form-product").value = (_subpage$product = subpage === null || subpage === void 0 ? void 0 : subpage.product) !== null && _subpage$product !== void 0 ? _subpage$product : "";
  document.getElementById("form-topic").value = (_subpage$topic = subpage === null || subpage === void 0 ? void 0 : subpage.topic) !== null && _subpage$topic !== void 0 ? _subpage$topic : "";
  document.getElementById("form-link").value = (_subpage$officialpg_l = subpage === null || subpage === void 0 ? void 0 : subpage.officialpg_link) !== null && _subpage$officialpg_l !== void 0 ? _subpage$officialpg_l : "";
  document.getElementById("form-img").value = (_subpage$img = subpage === null || subpage === void 0 ? void 0 : subpage.img) !== null && _subpage$img !== void 0 ? _subpage$img : "";
  document.getElementById("form-error").style.display = "none";
  document.getElementById("form-submit-btn").onclick = function () {
    var _subpage$Id;
    return submitForm(mode, (_subpage$Id = subpage === null || subpage === void 0 ? void 0 : subpage.Id) !== null && _subpage$Id !== void 0 ? _subpage$Id : null);
  };
  document.getElementById("back-btn-form").onclick = function () {
    mode === "edit" ? showView("subpage-view") : showView("searchpage-view");
  };
  // turn btn to an X -> ppl think that it wont save, keep arrow -> ppl think it will save and u can go back to it

  showView("form-view");
}

/**
 * Validates and submits the form data to the API.
 * Sends a POST request in "add" mode or a PUT request in "edit" mode.
 * On success, updates the local cache and navigates to the appropriate view.
 * @async
 * @param {"add"|"edit"} mode - Whether to create a new subpage or update an existing one
 * @param {number|null} subpageId - The ID of the subpage to update (only used in "edit" mode)
 * @returns {Promise<void>}
 */
function submitForm(_x5, _x6) {
  return _submitForm.apply(this, arguments);
} // toggle util function cuz im tired of making an eventhandler for every single element
/**
 * Toggles the `hidden` CSS class on the element referenced by the clicked button's
 * `data-toggle-target` attribute.
 * @param {MouseEvent} e - The click event from the toggle button
 * @returns {void}
 */
function _submitForm() {
  _submitForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(mode, subpageId) {
    var title, errorEl, body, res, saved, _saved$error, _saved$error2, idx, _t6;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          title = document.getElementById("form-title").value.trim();
          errorEl = document.getElementById("form-error");
          if (title) {
            _context7.n = 1;
            break;
          }
          errorEl.innerText = "Title is required.";
          errorEl.style.display = "block";
          return _context7.a(2);
        case 1:
          body = {
            title: title,
            description: document.getElementById("form-description").value.trim() || null,
            symptom: document.getElementById("form-symptom").value.trim() || null,
            // FIXME:yeah look into this one rq
            solution: formSolution.innerHTML.trim() || null,
            product: document.getElementById("form-product").value.trim() || null,
            topic: document.getElementById("form-topic").value.trim() || null,
            officialpg_link: document.getElementById("form-link").value.trim() || null,
            img: document.getElementById("form-img").value.trim() || null
          }; // TODO: add an alert? yes or no?
          _context7.p = 2;
          if (!(mode === "add")) {
            _context7.n = 6;
            break;
          }
          body.parentpg = currentPageId;
          _context7.n = 3;
          return fetch("https://localhost:3001/api/subpages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          });
        case 3:
          res = _context7.v;
          _context7.n = 4;
          return res.json();
        case 4:
          saved = _context7.v;
          if (res.ok) {
            _context7.n = 5;
            break;
          }
          throw new Error((_saved$error = saved.error) !== null && _saved$error !== void 0 ? _saved$error : "Failed to save");
        case 5:
          allSubpages.push(saved);
          renderSearchList(currentPageId);
          _context7.n = 10;
          break;
        case 6:
          _context7.n = 7;
          return fetch("https://localhost:3001/api/subpages/".concat(subpageId), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          });
        case 7:
          res = _context7.v;
          _context7.n = 8;
          return res.json();
        case 8:
          saved = _context7.v;
          if (res.ok) {
            _context7.n = 9;
            break;
          }
          throw new Error((_saved$error2 = saved.error) !== null && _saved$error2 !== void 0 ? _saved$error2 : "Failed to save");
        case 9:
          idx = allSubpages.findIndex(function (sp) {
            return sp.Id === subpageId;
          });
          if (idx !== -1) allSubpages[idx] = saved;
          renderSubpage(subpageId);
        case 10:
          _context7.n = 12;
          break;
        case 11:
          _context7.p = 11;
          _t6 = _context7.v;
          errorEl.innerText = _t6.message;
          errorEl.style.display = "block";
        case 12:
          return _context7.a(2);
      }
    }, _callee7, null, [[2, 11]]);
  }));
  return _submitForm.apply(this, arguments);
}
function toggleHidden(e) {
  var _document$getElementB;
  var targetId = e.currentTarget.dataset.toggleTarget;
  (_document$getElementB = document.getElementById(targetId)) === null || _document$getElementB === void 0 || _document$getElementB.classList.toggle("hidden");
}
/**
 * Attaches click event listeners to all elements with a `data-toggle-target` attribute,
 * wiring them up to {@link toggleHidden}.
 * @returns {void}
 */
function initToggleButtons() {
  document.querySelectorAll("[data-toggle-target]").forEach(function (btn) {
    btn.addEventListener("click", toggleHidden);
  });
}

// TODO:maybe add a ranking idk like top 3 lol cuz the front page lowk has some nothingburgers from 2020..
Office.onReady(function (info) {
  // const heading = () => {
  //   const element = document.createElement("h1");
  //   element.innerText = "TinyMCE Webpack demo";
  //   return element;
  // };

  var editorArea = function editorArea() {
    var element = document.getElementById("basic-example");
    element.id = "editor";
    return element;
  };
  // const parent = document.createElement("p");
  // parent.appendChild(editorArea());
  // document.body.appendChild(heading());
  // document.body.appendChild(parent);

  _WYSIWYGeditor_js__WEBPACK_IMPORTED_MODULE_1__.render();
  initToggleButtons();
  (0,_format_js__WEBPACK_IMPORTED_MODULE_0__.initFormatButtons)(formSolution);
  document.getElementById("back-btn-search").onclick = backButton;
  document.getElementById("back-btn-subpage").onclick = function () {
    return history.back();
  };
  document.getElementById("add-btn").onclick = function () {
    return showFormView("add");
  };

  // yeah this function is a floppery if u reload on a subpage
  // copied and pasted from stackoverflow... sorry...
  window.addEventListener("hashchange", function () {
    var hash = window.location.hash;
    if (!hash || hash === "#") {
      showMainView();
      return;
    }
    if (hash.startsWith("#subpage-")) {
      var id = parseInt(hash.replace("#subpage-", ""));
      if (!isNaN(id)) renderSubpage(id);
    } else if (hash.startsWith("#page-")) {
      var _id = parseInt(hash.replace("#page-", ""));
      if (!isNaN(_id)) renderSearchList(_id);
    } else if (hash === "#form") {
      showView("form-view");
    }
  });
  testConnection();
});

// TODO: - ENTIRE LIST OF ALL ARTICLES VIEW WHERE U CAN SORT THEM OUT AND FILTER?
// fix the search function like rn bro
// should i add key words

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"taskpane": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkoffice_addin_taskpane_js"] = self["webpackChunkoffice_addin_taskpane_js"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["tinymce","vendors-node_modules_tinymce_skins_ui_oxide_skin_min_css"], function() { return __webpack_require__("./src/taskpane/taskpane.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=taskpane.js.map