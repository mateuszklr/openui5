/*global QUnit */
/*eslint no-undef:1, no-unused-vars:1, strict: 1 */
sap.ui.define([
	"sap/ui/qunit/utils/createAndAppendDiv",
	"sap/ui/qunit/utils/nextUIUpdate",
	"sap/ui/webc/main/StepInput"
], function(createAndAppendDiv, nextUIUpdate, StepInput) {
	"use strict";

	createAndAppendDiv("uiArea");

	QUnit.module("Rendering", {
		beforeEach: async function() {
			this.oStepInput = new StepInput({
				placeholder: "This is my placeholder value",
				valueState: "Warning",
				valueStateMessage: "Value State Message",
				change: function(oEvent) {
					// console.log("Event change fired for StepInput with parameters: ", oEvent.getParameters());
				}
			});
			this.oStepInput.placeAt("uiArea");
			await nextUIUpdate();
		},
		afterEach: function() {
			this.oStepInput.destroy();
			this.oStepInput = null;
		}
	});

	QUnit.test("Should render", function(assert) {
		assert.ok(this.oStepInput.$(), "Rendered");
	});
});