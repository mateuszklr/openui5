/* global QUnit */

QUnit.config.autostart = false;

sap.ui.require(["sap/ui/core/Core"], Core => Core.ready(function() {
	"use strict";

	sap.ui.require([
		"sap/ui/demo/orderbrowser/test/integration/PhoneJourneys"
	], function() {
		QUnit.start();
	});
}));