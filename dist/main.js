/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_initApp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/initApp.js */ \"./modules/initApp.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  (0,_modules_initApp_js__WEBPACK_IMPORTED_MODULE_0__.initApp)();\n});\n\n\n//# sourceURL=webpack://webdev-dom-homework/./index.js?\n}");

/***/ }),

/***/ "./modules/api.js":
/*!************************!*\
  !*** ./modules/api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addComment: () => (/* binding */ addComment),\n/* harmony export */   getComments: () => (/* binding */ getComments)\n/* harmony export */ });\nconst personalKey = \"grebennikova-diana\";\nconst baseUrl = `https://wedev-api.sky.pro/api/v2/${personalKey}/comments`;\n\nconst getComments = async (token) => {\n  const response = await fetch(baseUrl, {\n    headers: token ? { Authorization: `Bearer ${token}` } : {},\n  });\n  if (!response.ok) throw new Error(\"Не удалось загрузить комментарии\");\n  const data = await response.json();\n  return data.comments;\n};\n\nconst addComment = async ({ text, token }) => {\n  const response = await fetch(baseUrl, {\n    method: \"POST\",\n    headers: { Authorization: `Bearer ${token}` },\n    body: JSON.stringify({ text }),\n  });\n\n  if (!response.ok) {\n    const err = await response.json();\n    throw new Error(err.error || \"Ошибка при добавлении комментария\");\n  }\n  return response.json();\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/api.js?\n}");

/***/ }),

/***/ "./modules/initApp.js":
/*!****************************!*\
  !*** ./modules/initApp.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initApp: () => (/* binding */ initApp)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./modules/api.js\");\n/* harmony import */ var _renderCommentsPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderCommentsPage.js */ \"./modules/renderCommentsPage.js\");\n\n\n\nconst initApp = async () => {\n  const user = JSON.parse(localStorage.getItem(\"user\"));\n  try {\n    const comments = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)(user?.token);\n    (0,_renderCommentsPage_js__WEBPACK_IMPORTED_MODULE_1__.renderCommentsPage)({ comments, user });\n  } catch (err) {\n    alert(\"Ошибка загрузки комментариев: \" + err.message);\n  }\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/initApp.js?\n}");

/***/ }),

/***/ "./modules/renderCommentsPage.js":
/*!***************************************!*\
  !*** ./modules/renderCommentsPage.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderCommentsPage: () => (/* binding */ renderCommentsPage)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./modules/api.js\");\n/* harmony import */ var _sanitize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sanitize.js */ \"./modules/sanitize.js\");\n\n\n\nfunction addReplyListeners(user, comments) {\n  const commentInput = document.querySelector(\".add-form-text\");\n\n  document.querySelectorAll(\".comment\").forEach((commentEl) => {\n    commentEl.addEventListener(\"click\", () => {\n      if (!user) {\n        alert(\"Авторизуйтесь, чтобы отвечать на комментарии\");\n        return;\n      }\n\n      const index = commentEl.dataset.index;\n      const comment = comments[index];\n\n      commentInput.value = `Ответ на комментарий: ${comment.author.name}: ${comment.text}\\n`;\n      commentInput.dataset.replyTo = comment.id;\n\n      commentInput.focus();\n\n      commentInput.selectionStart = commentInput.selectionEnd =\n        commentInput.value.length;\n    });\n  });\n}\n\nconst renderCommentsPage = async ({ comments, user }) => {\n  const app = document.querySelector(\".container\");\n  app.innerHTML = `<h1>Лента комментариев</h1>`;\n\n  const commentsList = document.createElement(\"ul\");\n  commentsList.className = \"comments\";\n  commentsList.innerHTML = comments\n    .map(\n      (c, index) => `\n        <li class=\"comment\" data-index=\"${index}\">\n          <div class=\"comment-header\">\n              <div>${(0,_sanitize_js__WEBPACK_IMPORTED_MODULE_1__.sanitizeHTML)(c.author.name)}</div>\n              <div>${new Date(c.date).toLocaleString()}</div>\n          </div>\n          <div class=\"comment-body\">\n              ${(0,_sanitize_js__WEBPACK_IMPORTED_MODULE_1__.sanitizeHTML)(c.text)}\n          </div>\n          <div class=\"comment-footer\">\n              <div class=\"likes\">\n              <span class=\"likes-counter\">${c.likes}</span>\n              <button class=\"like-button ${c.isLiked ? \"-active-like\" : \"\"}\"></button>\n              </div>\n          </div>\n        </li>`,\n    )\n    .join(\"\");\n  app.appendChild(commentsList);\n\n  document.querySelectorAll(\".like-button\").forEach((button, index) => {\n    button.addEventListener(\"click\", async (e) => {\n      e.stopPropagation();\n      if (!user) {\n        alert(\"Авторизуйтесь, чтобы ставить лайки\");\n        return;\n      }\n\n      const comment = comments[index];\n      try {\n        const res = await fetch(\n          `https://wedev-api.sky.pro/api/v2/grebennikova-diana/comments/${comment.id}/toggle-like`,\n          {\n            method: \"POST\",\n            headers: {\n              Authorization: `Bearer ${user.token}`,\n            },\n          },\n        );\n        const data = await res.json();\n        comments[index].likes = data.result.likes;\n        comments[index].isLiked = data.result.isLiked;\n        renderCommentsPage({ comments, user });\n      } catch (error) {\n        console.error(\"Ошибка при лайке:\", error);\n      }\n    });\n  });\n\n  if (user) {\n    const form = document.createElement(\"div\");\n    form.className = \"add-form\";\n    form.innerHTML = `\n      <input type=\"text\" class=\"add-form-name\" value=\"${(0,_sanitize_js__WEBPACK_IMPORTED_MODULE_1__.sanitizeHTML)(user.name)}\" readonly />\n      <textarea class=\"add-form-text\" placeholder=\"Введите комментарий\" rows=\"4\"></textarea>\n      <div class=\"add-form-row\">\n        <button class=\"add-form-button\">Отправить</button>\n      </div>\n    `;\n    app.appendChild(form);\n\n    const submitButton = form.querySelector(\".add-form-button\");\n    const commentInput = form.querySelector(\".add-form-text\");\n\n    submitButton.addEventListener(\"click\", async () => {\n      const text = commentInput.value.trim();\n      if (text.length < 3) {\n        alert(\"Комментарий должен содержать хотя бы 3 символа\");\n        return;\n      }\n\n      const parentId = commentInput.dataset.replyTo || null;\n\n      try {\n        await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.addComment)({ text, parentId, token: user.token });\n        commentInput.value = \"\";\n        commentInput.dataset.replyTo = \"\";\n\n        const updatedComments = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)(user.token);\n        renderCommentsPage({ comments: updatedComments, user });\n      } catch (err) {\n        alert(err.message);\n      }\n    });\n  } else {\n    const hint = document.createElement(\"div\");\n    hint.className = \"login-hint\";\n    hint.innerHTML = `Чтобы добавить комментарий, <a href=\"#\" id=\"login-link\">авторизуйтесь</a>`;\n    app.appendChild(hint);\n\n    const loginLink = document.getElementById(\"login-link\");\n    loginLink.addEventListener(\"click\", (e) => {\n      e.preventDefault();\n      __webpack_require__.e(/*! import() */ \"modules_renderLoginPage_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./renderLoginPage.js */ \"./modules/renderLoginPage.js\")).then((module) => module.renderLoginPage());\n    });\n  }\n  addReplyListeners(user, comments);\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/renderCommentsPage.js?\n}");

/***/ }),

/***/ "./modules/sanitize.js":
/*!*****************************!*\
  !*** ./modules/sanitize.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sanitizeHTML: () => (/* binding */ sanitizeHTML)\n/* harmony export */ });\nfunction sanitizeHTML(str) {\n  return str.replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\");\n}\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/sanitize.js?\n}");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".main.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "webdev-dom-homework:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
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
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebdev_dom_homework"] = self["webpackChunkwebdev_dom_homework"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;