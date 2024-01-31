/*global QUnit */
/*eslint no-undef:1, no-unused-vars:1, strict: 1 */
sap.ui.define([
	"sap/ui/qunit/utils/createAndAppendDiv",
	"sap/ui/qunit/utils/nextUIUpdate",
	"sap/ui/webc/main/Avatar",
	"sap/ui/webc/main/Button"
], function(createAndAppendDiv, nextUIUpdate, Avatar, Button) {
	"use strict";

	createAndAppendDiv("uiArea");

	QUnit.module("Rendering", {
		beforeEach: async function() {
			this.oAvatar = new Avatar({
				icon: "employee",
				badge: new Button({
					icon: "employee",
					text: "Some text...",
					click: function(oEvent) {
						// console.log("Event click fired for Button with parameters: ", oEvent.getParameters());
					}
				}),
				image: new Button({
					icon: "employee",
					text: "Some text...",
					click: function(oEvent) {
						// console.log("Event click fired for Button with parameters: ", oEvent.getParameters());
					}
				}),
				click: function(oEvent) {
					// console.log("Event click fired for Avatar with parameters: ", oEvent.getParameters());
				}
			});
			this.oAvatar.placeAt("uiArea");
			await nextUIUpdate();
		},
		afterEach: function() {
			this.oAvatar.destroy();
			this.oAvatar = null;
		}
	});

	QUnit.test("Should render", function(assert) {
		assert.ok(this.oAvatar.$(), "Rendered");
	});
});