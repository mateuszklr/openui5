/* global QUnit */

QUnit.config.autostart = false;

sap.ui.require(["sap/ui/core/Core"], Core => Core.ready(function () {
	"use strict";

	sap.ui.require([
		"test/AllTests"
	], function () {
		QUnit.start();
	});
}));
