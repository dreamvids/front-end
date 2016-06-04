"use strict";

function onload() {

	require("./scripts/drawer.js")();

}

if (window.addEventListener) {
	window.addEventListener("DOMContentLoaded", onload);
}

else {
	window.attachEvent("onload", onload);
}