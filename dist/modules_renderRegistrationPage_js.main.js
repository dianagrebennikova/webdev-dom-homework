"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkwebdev_dom_homework"] = self["webpackChunkwebdev_dom_homework"] || []).push([["modules_renderRegistrationPage_js"],{

/***/ "./modules/renderRegistrationPage.js":
/*!*******************************************!*\
  !*** ./modules/renderRegistrationPage.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderRegistrationPage: () => (/* binding */ renderRegistrationPage)\n/* harmony export */ });\n/* harmony import */ var _authApi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authApi.js */ \"./modules/authApi.js\");\n/* harmony import */ var _initApp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initApp.js */ \"./modules/initApp.js\");\n\n\n\nconst renderRegistrationPage = () => {\n  const app = document.querySelector(\".container\");\n  app.innerHTML = `\n    <h1>Регистрация</h1>\n    <form class=\"register-form\">\n      <input type=\"text\" name=\"login\" placeholder=\"Логин\" required />\n      <input type=\"text\" name=\"name\" placeholder=\"Имя\" required />\n      <input type=\"password\" name=\"password\" placeholder=\"Пароль\" required />\n      <button type=\"submit\">Зарегистрироваться</button>\n    </form>\n  `;\n\n  app.querySelector(\".register-form\").addEventListener(\"submit\", async (e) => {\n    e.preventDefault();\n    const login = e.target.elements.login.value.trim();\n    const name = e.target.elements.name.value.trim();\n    const password = e.target.elements.password.value.trim();\n    if (!name || !login || !password) {\n      alert(\"Поля не могут быть пустыми или состоять из пробелов\");\n      return;\n    }\n    try {\n      const user = await (0,_authApi_js__WEBPACK_IMPORTED_MODULE_0__.registerUser)(login, name, password);\n      localStorage.setItem(\"user\", JSON.stringify(user));\n      (0,_initApp_js__WEBPACK_IMPORTED_MODULE_1__.initApp)();\n    } catch (err) {\n      alert(err.message);\n    }\n  });\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/renderRegistrationPage.js?\n}");

/***/ })

}]);