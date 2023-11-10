sap.ui.predefine("testlibs/scenario2/lib3/library",[
	"sap/ui/core/Lib",
	"sap/ui/core/library"
], function(Library) {
	"use strict";
	return Library.init({
		name: "testlibs.scenario2.lib3",
		dependencies: [
			"testlibs.scenario2.lib4"
		],
		noLibraryCSS: true
	});
});
sap.ui.require.preload({
	"testlibs/scenario2/lib3/manifest.json":"{\n\t\"sap.ui5\": {\n\t\t\"dependencies\": {\n\t\t\t\"libs\": {\n\t\t\t\t\"testlibs.scenario2.lib4\": {\n\t\t\t\t\t\"minVersion\": \"1.0.0\"\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}"
});