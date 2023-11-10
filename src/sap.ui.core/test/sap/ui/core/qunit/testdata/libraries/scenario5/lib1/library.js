sap.ui.define([
	"sap/ui/core/Lib",
	"sap/ui/core/library"
], function(Library) {
	"use strict";
	return Library.init({
		name: "testlibs.scenario5.lib1",
		dependencies: [
			"testlibs.scenario5.lib3",
			"testlibs.scenario5.lib4",
			"testlibs.scenario5.lib5"
		],
		noLibraryCSS: true
	});
});