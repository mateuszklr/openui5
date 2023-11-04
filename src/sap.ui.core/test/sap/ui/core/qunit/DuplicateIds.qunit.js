/*global QUnit */
sap.ui.define([
	"sap/ui/core/ListItem"
], function(ListItem) {
	"use strict";

	var oListItem;
	var oListItem2;

	QUnit.test("First creation", function(assert) {
		assert.expect(0);
		oListItem = new ListItem("L1");
	});

	QUnit.test("Second, duplicate creation (with default settings)", function(assert) {
		assert.expect(1);
		try {
			oListItem2 = new ListItem("L1");
		} catch (e) {
			assert.equal(1, 1, "Error should be thrown");
		}
	});

	QUnit.test("Third, duplicate creation (after first element has been destroyed)", function(assert) {
		assert.expect(0);
		oListItem.destroy();
		oListItem2 = new ListItem("L1");
		oListItem2.destroy();
	});

	QUnit.test("ID Generation", function(assert) {
		assert.expect(1);
		oListItem = new ListItem();
		var oListItem2 = new ListItem();
		assert.ok(oListItem.getId() != oListItem2.getId(), "generated IDs should be different and there should have been no error");
	});
});