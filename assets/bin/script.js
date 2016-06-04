/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function onload() {

		__webpack_require__(1)();
	}

	if (window.addEventListener) {
		window.addEventListener("DOMContentLoaded", onload);
	} else {
		window.attachEvent("onload", onload);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var on = __webpack_require__(2);

	function Drawer(button, drawer, overlay) {

		this.button = button;
		this.buttonIcon = this.button.querySelector(".header__drawer-open__icon") || button;
		this.drawer = drawer;
		this.overlay = overlay;
		this.state = false;

		if (document.documentElement.clientWidth > 1000) {
			this.state = true;
		}

		this.refresh(true);

		on(this.button, "mousedown", this.toggle.bind(this));
		on(this.overlay, "mousedown", this.close.bind(this));
	}

	Drawer.prototype.refresh = function (brute) {

		if (brute) {
			this.buttonIcon.style.webkitTransition = "none";
			this.buttonIcon.style.mozTransition = "none";
			this.buttonIcon.style.transition = "none";
			this.drawer.style.webkitTransition = "none";
			this.drawer.style.mozTransition = "none";
			this.drawer.style.transition = "none";
		}

		if (this.state) {
			this.open();
		} else {
			this.close();
		}

		if (brute) {
			setTimeout(function () {

				this.buttonIcon.style.webkitTransition = null;
				this.buttonIcon.style.mozTransition = null;
				this.buttonIcon.style.transition = null;
				this.drawer.style.webkitTransition = null;
				this.drawer.style.mozTransition = null;
				this.drawer.style.transition = null;
			}.bind(this), 100);
		}
	};

	Drawer.prototype.toggle = function () {
		this.state = !this.state;
		this.refresh();
	};

	Drawer.prototype.open = function () {

		if ((" " + this.button.className + " ").indexOf(" header__drawer-open--active ") === -1) {
			this.button.className += " header__drawer-open--active";
		}

		if ((" " + this.drawer.className + " ").indexOf(" drawer--open ") === -1) {
			this.drawer.className += " drawer--open";
		}
	};

	Drawer.prototype.close = function () {

		this.button.className = (" " + this.button.className + " ").replace(" header__drawer-open--active ", "");
		this.drawer.className = (" " + this.drawer.className + " ").replace(" drawer--open ", "");
	};

	function initDrawer() {

		var button = document.querySelector(".header__drawer-open");
		var drawer = document.querySelector(".drawer");
		var drawerOverlay = document.querySelector(".drawer-overlay");

		if (button && drawer && drawerOverlay) {
			new Drawer(button, drawer, drawerOverlay);
		}
	}

	module.exports = initDrawer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	function on(element, event, fn) {

		if (!(typeof element.nodeName === "string" || element === window || element === document) || typeof event !== "string" || typeof fn !== "function") {

			console.error("Invalid arguments `on`", {

				element: element,
				event: event,
				fn: fn

			});

			return;
		}

		var that = {

			element: element,
			event: event.split(" ").join(""),
			fn: fn,
			_bind: element

		};

		that.bind = function (bind) {
			this._bind = bind;
		};

		if (typeof that.element.addEventListener !== "undefined") {

			that.element.addEventListener(that.event, function (that) {
				return function (event) {

					that.fn.call(that._bind, event);
				};
			}(that), false);
		} else if (typeof that.element.attachEvent !== "undefined") {

			that.element.attachEvent("on" + that.event, function (that) {
				return function (event) {

					that.fn.call(that._bind, event);
				};
			}(that));
		}

		return that;
	}

	module.exports = on;

/***/ }
/******/ ]);