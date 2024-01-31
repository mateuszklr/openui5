/*global QUnit */
/*eslint no-undef:1, no-unused-vars:1, strict: 1 */
sap.ui.define([
	"sap/ui/qunit/utils/createAndAppendDiv",
	"sap/ui/qunit/utils/nextUIUpdate",
	"sap/ui/webc/main/Label"
], function(createAndAppendDiv, nextUIUpdate, Label) {
	"use strict";

	createAndAppendDiv("uiArea");

	QUnit.module("Rendering", {
		beforeEach: async function() {
			this.oLabel = new Label({
				text: "Some text..."
			});
			this.oLabel.placeAt("uiArea");
			await nextUIUpdate();
		},
		afterEach: function() {
			this.oLabel.destroy();
			this.oLabel = null;
		}
	});

	QUnit.test("Should render", function(assert) {
		assert.ok(this.oLabel.$(), "Rendered");
	});
});