/*!
 * ${copyright}
 */

// ---------------------------------------------------------------------------------------
// Helper class used to execute model specific logic in FieldBase
// ---------------------------------------------------------------------------------------

sap.ui.define([
	'sap/ui/mdc/odata/v4/TypeMap'
], ODataV4TypeMap => {
	"use strict";

	ODataFieldBaseDelegate.getTypeMap = function(oPayload) {
		return ODataV4TypeMap;
	};

	return ODataFieldBaseDelegate;
});