// Note: the HTML page 'RatingIndicator.html' loads this module via data-sap-ui-on-init

sap.ui.define([
	"sap/ui/core/Core",
	"sap/ui/core/IconPool",
	"sap/ui/core/Item",
	"sap/ui/model/json/JSONModel",
	"sap/m/App",
	"sap/m/Bar",
	"sap/m/Button",
	"sap/m/CheckBox",
	"sap/m/Column",
	"sap/m/ColumnListItem",
	"sap/m/ComboBox",
	"sap/m/HBox",
	"sap/m/Input",
	"sap/m/InputListItem",
	"sap/m/FlexItemData",
	"sap/m/Label",
	"sap/m/List",
	"sap/m/Page",
	"sap/m/RatingIndicator",
	"sap/m/Select",
	"sap/m/Table",
	"sap/m/VBox",
	"sap/m/library",
	"sap/base/Log"
], async function(Core, IconPool, Item, JSONModel, App, Bar, Button, CheckBox, Column, ColumnListItem, ComboBox, HBox, Input, InputListItem, FlexItemData, Label, List, Page, RatingIndicator, Select, Table, VBox, mobileLibrary, Log) {
	"use strict";

	// shortcut for sap.m.InputType
	const InputType = mobileLibrary.InputType;

	// shortcut for sap.m.RatingIndicatorVisualMode
	const RatingIndicatorVisualMode = mobileLibrary.RatingIndicatorVisualMode;

	await Core.ready();

	var oCommonUseCasesLabel = new Label({text:'Most common use cases:'}).addStyleClass("TestPageHeaderLabel");

	var oLabel01 = new Label({text:'No icon size'}),
		oRating01 = new RatingIndicator("noIconSize", {
		enabled: false,
		value: 2.5,
		tooltip: "This is a tooltip"
	});

	var oLabel01a = new Label({text:'Display only with size and compact mode'}),
		oRating01a = new RatingIndicator("displayOnlyCompact", {
			displayOnly: true,
			value: 2.5,
			iconSize: "1rem",
			tooltip: "This is a tooltip"
		}).addStyleClass("sapUiSizeCompact");

	var oLabel01aa = new Label({text:'Display only default size'}),
	oRating01aa = new RatingIndicator("displayOnly", {
		displayOnly: true,
		value: 2.5,
		tooltip: "This is a tooltip"
	});

	var oLabel01b = new Label({text:'Read only'}),
		oRating01b = new RatingIndicator("readOnly", {
			editable: false,
			value: 2.5,
			tooltip: "This is a tooltip"
		});

	var oLabel0 = new Label({text:'Small inactive rating'}),
		oRating0 = new RatingIndicator("smallInactiveRI", {
			iconSize: "1.375rem",
			enabled: false,
			value: 2.5,
			tooltip: "This is a tooltip"
		});

	var oLabel1 = new Label({text:'Small active rating'}),
		oRating1 = new RatingIndicator("smallActiveRI", {
			iconSize: "1.375rem",
			value: 2.5,
			tooltip: "This is a tooltip"
		});

	var oLabel2 = new Label({text:'Medium inactive rating'}),
		oRating2 = new RatingIndicator("mediumInactiveRI", {
			enabled: false,
			iconSize: "1.5rem",
			value: 2.5
		});

	var oLabel3 = new Label({text:'Medium active rating', required: true, labelFor: "mediumActiveRI"}),
		oRating3 = new RatingIndicator("mediumActiveRI", {
			iconSize: "1.5rem",
			value: 2.5
		});

	var oLabel4 = new Label({text:'Large inactive rating'}),
		oRating4 = new RatingIndicator("largeInactiveRI", {
			iconSize: "2rem",
			enabled: false,
			value: 2.5
		});

	var oLabel5 = new Label({text:'Large active rating', labelFor: "largeActiveRI"}),
		oRating5 = new RatingIndicator("largeActiveRI", {
			iconSize: "2rem",
			value: 2.5,
			required: true
		});

	var oLabel6 = new Label({text:'Default active rating'}),
		oRating6 = new RatingIndicator("defaultActiveRI", {
			value: 4,
			maxValue: 8
		});

	var oVBox = new VBox({
	items: [
		oLabel01,
		oRating01,
		oLabel01a,
		oRating01a,
		oLabel01aa,
		oRating01aa,
		oLabel01b,
		oRating01b,
		oLabel0,
		oRating0,
		oLabel1,
		oRating1,
		oLabel2,
		oRating2,
		oLabel3,
		oRating3,
		oLabel4,
		oRating4,
		oLabel5,
		oRating5,
		oLabel6,
		oRating6
	]
});

	// rating table
	var oProducts = {
		items : [{
			name: "Headphone",
			price: "12.00 EUR",
			rating: 1
		}, {
			name : "Mouse Pad",
			price : "3.00 EUR",
			rating: 2
		}, {
			name : "Monitor",
			price : "45.00 EUR",
			rating: 3
		}, {
			name : "Optic Mouse",
			price : "15.00 EUR",
			rating: 4
		}, {
			name : "Dock Station",
			price : "55.00 EUR",
			rating: 5
		}]
	};

	var oRatingTable = new Table("items", {
			inset: true,
			mode: "MultiSelect",
			showUnread : true,
			headerText : "Rating Table",
			columns : [
				new Column({
					header: new Label({
						text: "Name"
					})
				}), new Column({
					header : new Label({
						text: "Price"
					})
				}), new Column({
					header: new Label({
						text: "Rating"
					}),
					demandPopin: true,
					minScreenWidth: "400px"
				})
			]
		}),

		oRatingTableTemplate = new ColumnListItem({
			type: "Active",
			unread: false,
			cells: [
				new Label({
					text : "{name}"
				}),
				new Label({
					text: "{price}"
				}), new RatingIndicator({
					enabled: false,
					value: "{rating}",
					tooltip: "This is a tooltip"
				})
			]
		});

	var oModel = new JSONModel();
	oModel.setData(oProducts);
	oRatingTable.setModel(oModel);
	oRatingTable.bindAggregation("items", "/items", oRatingTableTemplate);

	// rating list
	var oRatingList = new List("ratingList", {
		inset: true,
		headerText : "Rating List",
		swipeContent : new Button({
			text : "Swipe Button",
			type: "Reject",
			press : function(e) {
				oSwipeList3.swipeOut();
			}
		}),
		swipe: function(e) {
			var oSrcControl = e.getParameter("srcControl");
			if (oSrcControl instanceof Button) {
				e.preventDefault();
			}
		},
		items: [
			new InputListItem({
				type: "Active",
				label : "Rate me now!",
				content : new RatingIndicator({
					value: 1,
					tooltip: "Rating"
				})
			}),
			new InputListItem({
				type: "Active",
				label : "No, rate me!",
				content : new RatingIndicator({
					value: 2.5,
					tooltip: "Rating"
				})
			}),
			new InputListItem({
				type: "Active",
				label : "Or maybe rate me!",
				content : new RatingIndicator({
					value: 5,
					tooltip: "Rating"
				})
			})
		]
	});

	// rating with automatically updated label
	var oUpdatedLabel = new Label({text:'Rating with automatically updated label (black = liveChange, green = change):'}).addStyleClass("TestPageHeaderLabel");

	var oLabel3 = new Label({text:' Rate me!'}).addStyleClass("descriptiveRatingLabel"),
		oRating3 = new RatingIndicator("automaticRI", {
			value: 2.5,
			iconSize: "1.375rem",
			liveChange: function(oControlEvent) {
				Log.info("Event fired: 'liveChange' value property to " + oControlEvent.getParameter("value") + " on " + this);
				oLabel3.setText(" " + oControlEvent.getParameter("value") + " out of " + oRating3.getMaxValue());
				oLabel3.removeStyleClass('changeEvent');
			},
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
				oLabel3.setText(" " + oControlEvent.getParameter("value") + " out of " + oRating3.getMaxValue());
				oLabel3.addStyleClass('changeEvent');
			}
		}),
		oHBoxLabeledRating = new HBox("automaticRIwithLabel", {
			items: [
				oRating3,
				oLabel3
		]
	}).addStyleClass("TestPageRatingWithWhiteBackground");

	// API Test panel
	var oAPILabel = new Label({text:'API test:'}).addStyleClass("TestPageHeaderLabel");

	var oLabelAPI0 = new Label({text:'Result:'}),
		oRatingAPI0 = new RatingIndicator({
			value: 2.5,
			maxValue: 5,
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			}
		});

	var oValueLabel = new Label({text: 'Value'}),
		oValueInput = new Input({
			type: InputType.Number,
			value: 2.5,
			placeholder: 'eg. 1.23'
		});

	var oMaxValueLabel = new Label({text: 'Rating items'}),
		oMaxValueInput = new Input({
			type: InputType.Number,
			value: 5,
			placeholder: '5'
		});

	var oIconSizeLabel = new Label({text: 'IconSize'}),
		oIconSizeInput = new Input({
			type: InputType.Text,
			value: "1.375rem",
			placeholder: '1.375rem'
		});

	var aNames = IconPool.getIconNames(),
		aIconsSelected = [], aIconsUnselected = [], aIconsHovered = [];

	for (let index = 0; index < aNames.length ; index++){
		aIconsSelected.push(new Item(aNames[index] + "_selected", {text: aNames[index]}));
	}
	for (let index = 0; index < aNames.length ; index++){
		aIconsUnselected.push(new Item(aNames[index] + "_unselected", {text: aNames[index]}));
	}
	for (let index = 0; index < aNames.length ; index++){
		aIconsHovered.push(new Item(aNames[index] + "_hovered", {text: aNames[index]}));
	}

	var oIconSelectedLabel = new Label({text: 'IconSelected'}),
		oIconSelectedComboBox = new ComboBox({
			selectedItemId: "favorite_selected",
			items: aIconsSelected
		});

	var oIconUnselectedLabel = new Label({text: 'IconUnselected'}),
		oIconUnselectedComboBox = new ComboBox({
			selectedItemId: "favorite_unselected",
			items: aIconsUnselected
		});

	var oIconHoveredLabel = new Label({text: 'IconHovered'}),
		oIconHoveredComboBox = new ComboBox({
			selectedItemId: "favorite_hovered",
			items: aIconsHovered
		});

	var oVisualModeLabel = new Label({text: 'VisualMode'}),
		oVisualModeSelect = new Select({
			selectedItemId: "Half",
			items: [
				new Item("Full", {text: "Full"}),
				new Item("Half", {text: "Half"})
			]
		});

	var oEnabledLabel = new Label({text: 'Enabled'}),
		oEnabledCheckbox = new CheckBox({
			selected: true
		});

	var oVisibleLabel = new Label({text: 'Visible'}),
		oVisibleCheckbox = new CheckBox({
			selected: true
		});

	var oSubmitButton = new Button({
		text: "Apply changes",
		press: function() {
			oRatingAPI0.setValue(parseFloat(oValueInput.getValue()));
			oRatingAPI0.setMaxValue(parseInt(oMaxValueInput.getValue()));
			oRatingAPI0.setIconSize(oIconSizeInput.getValue());
			oRatingAPI0.setVisualMode(oVisualModeSelect.getSelectedItemId());
			oRatingAPI0.setIconSelected(IconPool.getIconURI(oIconSelectedComboBox.getSelectedItem().getText()));
			oRatingAPI0.setIconUnselected(IconPool.getIconURI(oIconUnselectedComboBox.getSelectedItem().getText()));
			oRatingAPI0.setIconHovered(IconPool.getIconURI(oIconHoveredComboBox.getSelectedItem().getText()));
			oRatingAPI0.setEnabled(oEnabledCheckbox.getSelected());
			oRatingAPI0.setVisible(oVisibleCheckbox.getSelected());
		},
		layoutData: new FlexItemData({growFactor: 1})
	});

	var oVBoxAPI = new VBox({
		items: [
			oValueLabel,
			oValueInput,
			oMaxValueLabel,
			oMaxValueInput,
			oIconSizeLabel,
			oIconSizeInput,
			oVisualModeLabel,
			oVisualModeSelect,
			oIconSelectedLabel,
			oIconSelectedComboBox,
			oIconUnselectedLabel,
			oIconUnselectedComboBox,
			oIconHoveredLabel,
			oIconHoveredComboBox,
			oEnabledLabel,
			oEnabledCheckbox,
			oVisibleLabel,
			oVisibleCheckbox,
			oSubmitButton,
			oLabelAPI0,
			oRatingAPI0
		]
	}).addStyleClass("TestPageRatingWithWhiteBackground");

	var oPossibleOptionsLabel = new Label({text:'All other possible options & combinations (not recommended):'}).addStyleClass("TestPageHeaderLabel");

	// custom icons for rating
	var oLabelSpecial5 = new Label({text:'Rating with customized icons 4.4 / 8 (Half):'}),
		oRatingSpecial5 = new RatingIndicator({
			maxValue: 8,
			value: 4.4,
			visible: true,
			enabled: true,
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: IconPool.getIconURI("process"),
			iconUnselected: IconPool.getIconURI("attachment"),
			iconHovered: IconPool.getIconURI("paper-plane")
	});

	// not existent icons for rating
	var oLabelSpecial6 = new Label({text:'Rating with non-existent icons 3 / 7 (Half):'}),
		oRatingSpecial6 = new RatingIndicator({
			value: 3,
			maxValue: 7,
			visible: true,
			enabled: true,
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: IconPool.getIconURI("querstromzerspaner"),
			iconUnselected: IconPool.getIconURI("monstertruckdriver"),
			iconHovered: IconPool.getIconURI("bolzplatz")
		});

	// disabled rating
	var oLabelSpecial7 = new Label({text:'disabled rating with float value 4.5678 / 15 (Half):'}),
		oRatingSpecial7 = new RatingIndicator({
			maxValue: 15,
			value: 4.5678,
			visible: true,
			enabled: false,
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: IconPool.getIconURI("favorite"),
			iconUnselected: IconPool.getIconURI("unfavorite"),
			iconHovered: IconPool.getIconURI("accept")
		});

	// standard with incorrect initial value (has to be rounded to 3 for display)
	var oLabelSpecial8 = new Label({text:'Standard rating with float value 2.5678 / 6 (Full, has to be rounded for display):'}),
		oRatingSpecial8 = new RatingIndicator({
			maxValue: 6,
			value: 2.5678,
			visible: true,
			enabled: true,
			visualMode: RatingIndicatorVisualMode.Full,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: IconPool.getIconURI("favorite"),
			iconUnselected: IconPool.getIconURI("unfavorite"),
			iconHovered: IconPool.getIconURI("favorite")
		});

	// invisible rating
	var oLabelSpecial9 = new Label({text:'Invisible not enabled rating with float value 1 / 5 (full):'}),
		oRatingSpecial9 = new RatingIndicator({
			maxValue: 5,
			value: 1,
			visible: false,
			enabled: false,
			visualMode: RatingIndicatorVisualMode.Full,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: IconPool.getIconURI("favorite"),
			iconUnselected: IconPool.getIconURI("unfavorite")
		});

	// small image rating
	var oLabelSpecial10 = new Label({text:'Small image-based rating 2.75 / 10 (Half):'}),
		oRatingSpecial10 = new RatingIndicator({
			maxValue: 10,
			value: 2.75,
			iconSize: "1rem",
			visible: true,
			enabled: true,
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: "images/candy_v_46x46.png",
			iconUnselected: "images/candy_x_46x46.png",
			iconHovered: "images/candy_star_46x46.png"
		});

	// medium image rating
	var oLabelSpecial11 = new Label({text:'Medium image-based rating 5.77 / 10 (Half):'}),
		oRatingSpecial11 = new RatingIndicator({
			maxValue: 10,
			value: 5.77,
			iconSize: "1.375rem",
			visible: true,
			enabled: true,
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: "images/candy_v_46x46.png",
			iconUnselected: "images/candy_x_46x46.png",
			iconHovered: "images/candy_star_46x46.png"
		});

	// large image rating
	var oLabelSpecial12 = new Label({text:'Large image-based rating 8.34 / 10 (Half):'}),
		oRatingSpecial12 = new RatingIndicator({
			maxValue: 10,
			value: 8.34,
			iconSize: "2rem",
			visible: true,
			enabled: true,
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: "images/candy_v_46x46.png",
			iconUnselected: "images/candy_x_46x46.png",
			iconHovered: "images/candy_star_46x46.png"
		});

	// mixed image and iconpool rating
	var oLabelSpecial13 = new Label({text:'Mixed image and iconpool rating 6.5 / 10 (Half):'}),
		oRatingSpecial13 = new RatingIndicator({
			maxValue: 10,
			value: 6.5,
			visible: true,
			enabled: true,
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: IconPool.getIconURI("nutrition-activity"),
			iconUnselected: "images/wounds_doc@2.png",
			iconHovered: IconPool.getIconURI("nutrition-activity")
		});

	// small rating with custom icons
	var oLabelSpecial14 = new Label({text:'Small rating with custom icons value 2.5 / 5 (Half):'}),
		oRatingSpecial14 = new RatingIndicator({
			iconSize: "1rem",
			value: 2.5,
			maxValue: 10,
			visible: true,
			enabled: true,
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: IconPool.getIconURI("physical-activity"),
			iconUnselected: IconPool.getIconURI("media-play"),
			iconHovered: IconPool.getIconURI("sys-enter-2")
		});

	// large rating with custom icons
	var oLabelSpecial15 = new Label({text:'large rating with custom icons value 2.5 / 5 (Half):'}),
		oRatingSpecial15 = new RatingIndicator({
			iconSize: "2rem",
			value: 2.5,
			maxValue: 10,
			visible: true,
			enabled: true,
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			},
			iconSelected: IconPool.getIconURI("umbrella"),
			iconUnselected: IconPool.getIconURI("drill-up"),
			iconHovered: IconPool.getIconURI("accept")
		});

	// large rating with custom icons
	var oLabelSpecial16 = new Label({text:'200px iconSize rating value 2.5 / 5 (Half):'}),
		oRatingSpecial16 = new RatingIndicator({
			iconSize: "200px",
			value: 2.5,
			maxValue: 5,
			visible: true,
			enabled: true,
			iconHovered: IconPool.getIconURI("accept"),
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			}
		});

	// large rating with custom icons
	var oLabelSpecial17 = new Label({text:'30pt iconSize rating value 2.5 / 5 (Half):'}),
		oRatingSpecial17 = new RatingIndicator({
			iconSize: "30pt",
			value: 2.5,
			maxValue: 5,
			visible: true,
			enabled: true,
			iconHovered: IconPool.getIconURI("accept"),
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			}
		});

	// large rating with custom icons
	var oLabelSpecial18 = new Label({text:'10% iconSize rating value 2.5 / 5 (Half):'}),
		oRatingSpecial18 = new RatingIndicator({
			iconSize: "10%",
			value: 2.5,
			maxValue: 5,
			visible: true,
			enabled: true,
			iconHovered: IconPool.getIconURI("accept"),
			visualMode: RatingIndicatorVisualMode.Half,
			change : function(oControlEvent) {
				Log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("value") + " on " + this);
			}
		});

	var oVBoxSpecial = new VBox({
		items: [
			oLabelSpecial5,
			oRatingSpecial5,
			oLabelSpecial6,
			oRatingSpecial6,
			oLabelSpecial7,
			oRatingSpecial7,
			oLabelSpecial8,
			oRatingSpecial8,
			oLabelSpecial9,
			oRatingSpecial9,
			oLabelSpecial10,
			oRatingSpecial10,
			oLabelSpecial11,
			oRatingSpecial11,
			oLabelSpecial12,
			oRatingSpecial12,
			oLabelSpecial13,
			oRatingSpecial13,
			oLabelSpecial14,
			oRatingSpecial14,
			oLabelSpecial15,
			oRatingSpecial15,
			oLabelSpecial16,
			oRatingSpecial16,
			oLabelSpecial17,
			oRatingSpecial17,
			oLabelSpecial18,
			oRatingSpecial18
		]
	}).addStyleClass("TestPageRatingWithWhiteBackground");

	var oRatingPage = new Page("ratingPage", {
		title : "sap.m.RatingIndicator",
		content: [
			oCommonUseCasesLabel,
			oVBox,
			oRatingTable,
			oRatingList,
			oUpdatedLabel,
			oHBoxLabeledRating,
			oAPILabel,
			oVBoxAPI,
			oPossibleOptionsLabel,
			oVBoxSpecial
		]
	});

	var oApp = new App("myApp", {
		initialPage: "ratingPage"
	});

	// place content
	oApp.addPage(oRatingPage);
	oApp.placeAt("body");
});