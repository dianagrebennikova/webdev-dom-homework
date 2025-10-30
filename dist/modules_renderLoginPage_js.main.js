"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwebdev_dom_homework"] = self["webpackChunkwebdev_dom_homework"] || []).push([["modules_renderLoginPage_js"],{

/***/ "./modules/authApi.js":
/*!****************************!*\
  !*** ./modules/authApi.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loginUser: () => (/* binding */ loginUser),\n/* harmony export */   registerUser: () => (/* binding */ registerUser)\n/* harmony export */ });\nconst authUrl = \"https://wedev-api.sky.pro/api/user\";\n\nconst loginUser = async (login, password) => {\n  const response = await fetch(`${authUrl}/login`, {\n    method: \"POST\",\n    body: JSON.stringify({ login, password }),\n  });\n\n  if (!response.ok) {\n    const error = await response.json();\n    throw new Error(error.error || \"Неверный логин или пароль\");\n  }\n\n  return (await response.json()).user;\n};\n\nconst registerUser = async (login, name, password) => {\n  const response = await fetch(authUrl, {\n    method: \"POST\",\n    body: JSON.stringify({ login, name, password }),\n  });\n\n  if (!response.ok) {\n    const error = await response.json();\n    throw new Error(error.error || \"Ошибка регистрации\");\n  }\n\n  return (await response.json()).user;\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/authApi.js?\n}");

/***/ }),

/***/ "./modules/renderLoginPage.js":
/*!************************************!*\
  !*** ./modules/renderLoginPage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLoginPage: () => (/* binding */ renderLoginPage)\n/* harmony export */ });\n/* harmony import */ var _authApi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authApi.js */ \"./modules/authApi.js\");\n/* harmony import */ var _initApp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initApp.js */ \"./modules/initApp.js\");\n\n\n\nconst renderLoginPage = () => {\n  const app = document.querySelector(\".container\");\n  app.innerHTML = `\n    <h1>Авторизация</h1>\n    <form class=\"login-form\">\n      <input type=\"text\" name=\"login\" placeholder=\"Логин\" autocomplete=\"username\" required />\n      <input type=\"password\" name=\"password\" placeholder=\"Пароль\" autocomplete=\"current-password\" required />\n      <button type=\"submit\">Войти</button>\n    </form>\n    <div>Нет аккаунта? <a href=\"#\" id=\"register-link\">Зарегистрироваться</a></div>\n  `;\n\n  app.querySelector(\".login-form\").addEventListener(\"submit\", async (e) => {\n    e.preventDefault();\n    const login = e.target.elements.login.value.trim();\n    const password = e.target.elements.password.value.trim();\n    if (!login || !password) {\n      alert(\"Введите логин и пароль (не пустые пробелы)\");\n      return;\n    }\n    try {\n      const user = await (0,_authApi_js__WEBPACK_IMPORTED_MODULE_0__.loginUser)(login, password);\n      localStorage.setItem(\"user\", JSON.stringify(user));\n      (0,_initApp_js__WEBPACK_IMPORTED_MODULE_1__.initApp)();\n    } catch (err) {\n      alert(err.message);\n    }\n  });\n\n  app.querySelector(\"#register-link\").addEventListener(\"click\", (e) => {\n    e.preventDefault();\n    __webpack_require__.e(/*! import() */ \"modules_renderRegistrationPage_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./renderRegistrationPage.js */ \"./modules/renderRegistrationPage.js\")).then((m) =>\n      m.renderRegistrationPage(),\n    );\n  });\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/renderLoginPage.js?\n}");

/***/ })

}]);