// Note: the HTML page 'ManagedObjectObserver.html' loads this module via data-sap-ui-on-init

sap.ui.define(['sap/ui/base/ManagedObjectObserver', 'sap/ui/core/Control', 'sap/m/Input', 'sap/m/Text', "sap/m/ToggleButton"],
		function(ManagedObjectObserver, Control, Input, Text, ToggleButton) {
			"use strict";

			/*
			 * Sample: Observing an Input control and update Text control
			 */
			var oInput1 = new Input("I1", {width: "100%"}).placeAt("sample1");
			var oText1 = new Text("T1", {text: "Value:", width: "100%"}).placeAt("sample1");
			var fnObserve1 = function(oChanges) {
				if (oChanges.name == "value") {
					oText1.setText("Value: " + oChanges.current);
				}
			};
			var oObserver1 = new ManagedObjectObserver(fnObserve1);
			oObserver1.observe(oInput1, {
				properties: ["value"]
			});

			/*
			 * Sample: custom list like control that observes it items and the proiperties of the items
			 */
			var myList = Control.extend("myList", {

				metadata: {
					aggregations: {
						"items": {type: "sap.m.Input", multiple: true, singularName : "item"}
					},
					defaultAggregation: "items"
				},

				init:  function() {

					this._oObserver = new ManagedObjectObserver(this._observeChanges.bind(this));
					this._oObserver.observe(this, {
						aggregations: ["items"]
					});

				},

				exit: function() {

					this._oObserver.disconnect();
					this._oObserver = undefined;

				},

				_observeChanges:  function(oChanges) {

					if (oChanges.object == this) {
						// it's the List
						if (oChanges.name == "items") {
							if (oChanges.mutation == "insert") {
								this._oObserver.observe(oChanges.child, {
									properties: ["value"]
								});
							} else {
								this._oObserver.unobserve(oChanges.child);
							}
						}
					} else {
						// it's a item
						if (oChanges.name == "value") {
							if (oChanges.current == "Error") {
								oChanges.object.setValueState("Error");
							} else {
								oChanges.object.setValueState("None");
							}
						}
					}

				},

				renderer: {
					apiVersion: 2,
					render: function(oRm, oMyList) {

						oRm.openStart("div", oMyList).openEnd();

						var oItems = oMyList.getItems();
						for (var i = 0; i < oItems.length; i++) {
							oRm.renderControl(oItems[i]);
						}

						oRm.close("div");

					}
				}
			});

			var oMyList = new myList("myList1", {
				items: [ new Input("Item1", {value: "Item 1"}),
						 new Input("Item2", {value: "Item 2"}),
						 new Input("Item3", {value: "Item 3"})
						]
			}).placeAt("sample2");

			var oItem4 = new Input("Item4", {value: "Item 4"});

			new ToggleButton({
				text: "additional item",
				press: function(oEvent) {
					var bPressed = oEvent.getParameter("pressed");
					if (bPressed) {
						oMyList.addItem(oItem4);
					} else {
						oMyList.removeItem(oItem4);
					}
				}
			}).placeAt("sample2");
		});