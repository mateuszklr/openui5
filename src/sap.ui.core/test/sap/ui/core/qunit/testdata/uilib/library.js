/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library sap.ui.testlib
 */
sap.ui.define([
	"sap/ui/core/Lib",
	// library dependencies
	"sap/ui/core/library",
	"sap/ui/core/Core"
], function(Library, coreLib, Core) {
	"use strict";

	// delegate further initialization of this library to the Core
	return Library.init({
		name : "sap.ui.testlib",
		dependencies : ["sap.ui.core"],
		types: [
		],
		interfaces: [
		],
		controls: [
			"sap.ui.testlib.TestButton"
		],
		elements: [
		],
		version: "1.2.3"
	});
});
