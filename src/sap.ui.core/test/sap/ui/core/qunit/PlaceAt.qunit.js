/* global QUnit */
sap.ui.define([
	"sap/m/Panel",
	"sap/m/Button",
	"sap/ui/core/Core",
	"sap/ui/core/Element",
	"sap/ui/core/StaticArea",
	"sap/ui/core/UIArea",
	"sap/ui/qunit/utils/createAndAppendDiv"
], function(Panel, Button, oCore, Element, StaticArea, UIArea, createAndAppendDiv) {
	"use strict";

	createAndAppendDiv(["uiArea1", "uiArea2", "uiArea3", "uiArea4"]);

	var oPanel = new Panel("myPanel");
	oPanel.placeAt("uiArea1");

	function doCheckPlaceAtResult(assert, aCallResult, iExpectedLength, iExpectedIndex, sText) {
		sText = " after placeAt with '" + sText + "'";
		var oContainer = aCallResult[1];
		assert.ok(oContainer, "Container available" + sText);
		if (oContainer) {
			assert.equal(oContainer.getContent().length, iExpectedLength, "# Container children" + sText);
			assert.equal(oContainer.getContent()[iExpectedIndex].getId(), aCallResult[0], "Correct Position of child" + sText);
		}
	}

	function doTestPlaceAt(assert, oContainerRef, sContainerId, bIsUiArea) {
		function placeAt(oPosition) {
			var oControl = new Button();
			if (oPosition) {
				oControl.placeAt(oContainerRef, oPosition);
			} else {
				oControl.placeAt(oContainerRef);
			}

			var oCont = bIsUiArea ? UIArea.registry.get(sContainerId) : Element.getElementById(sContainerId);
			return [oControl.getId(), oCont];
		}

		//Test "only" first to bring container into a clear state
		var aResult = placeAt("only");
		doCheckPlaceAtResult(assert, aResult, 1, 0, "only");
		aResult = placeAt(null);
		doCheckPlaceAtResult(assert, aResult, 2, 1, "default (last)");
		aResult = placeAt("last");
		doCheckPlaceAtResult(assert, aResult, 3, 2, "last");
		aResult = placeAt("first");
		doCheckPlaceAtResult(assert, aResult, 4, 0, "first");
		aResult = placeAt(2);
		doCheckPlaceAtResult(assert, aResult, 5, 2, "index 2");
		aResult = placeAt("only");
		doCheckPlaceAtResult(assert, aResult, 1, 0, "only");
	}


	QUnit.module("sap.ui.core.Control.placeAt");

	QUnit.test("Deferred call", function(assert) {
		doCheckPlaceAtResult(assert, ["myPanel", UIArea.registry.get("uiArea1")], 1, 0, "deferred call");
	});

	QUnit.test("UIArea via ID", function(assert) {
		doTestPlaceAt(assert, "uiArea2", "uiArea2", true);
	});

	QUnit.test("UIArea via DomRef", function(assert) {
		doTestPlaceAt(assert, document.getElementById("uiArea2"), "uiArea2", true);
	});

	QUnit.test("Static UIArea via ID", function(assert) {
		doTestPlaceAt(assert, StaticArea.STATIC_UIAREA_ID, StaticArea.STATIC_UIAREA_ID, true);
	});

	QUnit.test("Static UIArea via DomRef", function(assert) {
		doTestPlaceAt(assert, StaticArea.getDomRef(), StaticArea.STATIC_UIAREA_ID, true);
	});

	QUnit.test("Container Control via Control reference", function(assert) {
		doTestPlaceAt(assert, oPanel, "myPanel", false);
	});

	QUnit.test("Container Control via ID", function(assert) {
		doTestPlaceAt(assert, "myPanel", "myPanel", false);
	});
});