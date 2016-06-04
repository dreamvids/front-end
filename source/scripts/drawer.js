"use strict";

var on = require("../core/on.js");

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

Drawer.prototype.refresh = function(brute) {

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
	}
	else {
		this.close();
	}

	if (brute) {
		setTimeout(function() {

			this.buttonIcon.style.webkitTransition = null;
			this.buttonIcon.style.mozTransition = null;
			this.buttonIcon.style.transition = null;
			this.drawer.style.webkitTransition = null;
			this.drawer.style.mozTransition = null;
			this.drawer.style.transition = null;

		}.bind(this), 100);
	}

};

Drawer.prototype.toggle = function() {
	this.state = !this.state;
	this.refresh();
};

Drawer.prototype.open = function() {

	if ((" " + this.button.className + " ").indexOf(" header__drawer-open--active ") === -1) {
		this.button.className += " header__drawer-open--active";
	}

	if ((" " + this.drawer.className + " ").indexOf(" drawer--open ") === -1) {
		this.drawer.className += " drawer--open";
	}

};

Drawer.prototype.close = function() {

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
