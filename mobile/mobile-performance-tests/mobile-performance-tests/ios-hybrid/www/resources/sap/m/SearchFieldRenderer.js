/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */

jQuery.sap.declare("sap.m.SearchFieldRenderer");

/**
 * @class SearchField renderer. 
 * @static
 */
sap.m.SearchFieldRenderer = {
};

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.SearchFieldRenderer.render = function(oRenderManager, oSF){ 
	// render nothing if control is invisible
	if (!oSF.getVisible()) {
		return;
	}

	var rm = oRenderManager;

	// container
	rm.write("<div");
	rm.writeControlData(oSF);
	rm.addClass("sapMSF");
	rm.writeClasses();
	rm.write(">");

	// 1. magnifier icon
	if (oSF.getShowMagnifier()) { rm.write('<div class="sapMSFMG"></div>'); }
	
	// 2. Input type="search"
	rm.write('<input type="search"');
	rm.writeAttribute("id", oSF.getId() + "-I");

	rm.addClass("sapMSFI");

	if(jQuery.browser.chrome){
		rm.addClass("sapMSFICr"); // specific Chrome rendering
	}

	if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
		if ((/OS [6-9](.*) like Mac OS X/i.test(navigator.userAgent))) {
			// iOS version is 6+.
			rm.addClass("sapMSFIIos6"); // specific Ios6 rendering
		}
	}

	if (!oSF.getEnabled()){
		// hide the reset button even if value is not empty: user cannot press it
		rm.addClass("sapMSFIDisabled");
	}
	rm.writeClasses();


	if (!oSF.getEnabled()) { rm.writeAttribute("disabled","disabled"); }
	if (oSF.getShowMagnifier()) { rm.writeAttribute("results", 0); }
	if (oSF.getPlaceholder()) { rm.writeAttributeEscaped("placeholder", oSF.getPlaceholder()); }
	if (oSF.getMaxLength()) { rm.writeAttribute("maxLength", oSF.getMaxLength()); }
	if (oSF.getValue()) { rm.writeAttributeEscaped("value", oSF.getValue()); }
	if (oSF.getWidth()) { rm.writeAttribute("style", "width:" + oSF.getWidth() + ";"); }

	rm.write(">");

	
	// 3. Reset button (transparent, lies over "X" of input, reacts on touch correctly)
	rm.write("<div");
	rm.writeAttribute("id", oSF.getId() + "-reset");
	rm.addClass("sapMSFR");
	rm.writeClasses();
	rm.write("></div>");

	rm.write("</div>");

};
