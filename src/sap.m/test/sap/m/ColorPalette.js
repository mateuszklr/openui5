sap.ui.define([
  "sap/m/ColorPalette",
  "sap/m/ColorPalettePopover",
  "sap/m/MessageBox",
  "sap/ui/core/Element",
  "sap/ui/core/Theming",
  "sap/m/Panel",
  "sap/m/Label",
  "sap/m/Title",
  "sap/m/Button",
  "sap/m/Slider",
  "sap/m/ToggleButton",
  "sap/m/VBox",
  "sap/m/HBox",
  "sap/m/FlexBox",
  "sap/m/Toolbar",
  "sap/m/Select",
  "sap/ui/core/Item",
  "sap/m/ToolbarSpacer",
  "sap/m/CheckBox",
  "sap/m/MessageToast",
  "sap/m/Input",
  "sap/ui/Device",
  "sap/ui/layout/form/SimpleForm",
  "sap/ui/layout/library",
  "sap/ui/core/library",
  "sap/ui/thirdparty/jquery"
], function(
  ColorPalette,
  ColorPalettePopover,
  MessageBox,
  Element,
  Theming,
  Panel,
  Label,
  Title,
  Button,
  Slider,
  ToggleButton,
  VBox,
  HBox,
  FlexBox,
  Toolbar,
  Select,
  Item,
  ToolbarSpacer,
  CheckBox,
  MessageToast,
  Input,
  Device,
  SimpleForm,
  layoutLibrary,
  coreLibrary,
  jQuery
) {
  "use strict";

  // shortcut for sap.ui.core.TitleLevel
  const TitleLevel = coreLibrary.TitleLevel;

  // shortcut for sap.ui.layout.BackgroundDesign
  const BackgroundDesign = layoutLibrary.BackgroundDesign;

  new VBox({
	  items: [
		  new Label({text: "Use slider to control the width of the content area"}),
		  new Slider("theslider", {
			  value: window.innerWidth,
			  max: window.innerWidth,
			  step: 1,
			  liveChange: function (oEvent) {
				  jQuery("#content").css('width', oEvent.getParameter("value"));
			  },
			  showHandleTooltip: true,
			  inputsAsTooltips: true
		  }),
		  new FlexBox({
			  alignItems: "Center",
			  wrap: "Wrap",
			  items: [
				  new ToggleButton({
					  text: "+",
					  press: function (oEvent) {
						  var bPressed = this.getPressed();
						  null.getContent().forEach(function (oItem) {
							  if (oItem.getMetadata().getName() === "sap.m.Panel") {
								  oItem.setExpanded(bPressed);
							  }
						  });
						  this.setText(bPressed ? "-" : "+");
					  }
				  }),
				  new HBox({
					  alignItems: "Center",
					  items: [
						  new Label({text: "Form Factor"}),
						  new ToggleButton({
							  text: "Compact Mode",
							  pressed: !Device.system.phone && jQuery("html").hasClass("sapUiSizeCompact"),
							  press: function () {
								  jQuery("body").toggleClass("sapUiSizeCompact", this.getPressed());
								  jQuery("body").toggleClass("sapUiSizeCozy", !this.getPressed());
							  }
						  })
					  ]
				  }),
				  new HBox("settingsTheme", {
					  alignItems: "Center",
					  items: [
						  new Label({text: "Theme:"}),
						  new Select("settingsThemeName",
							  {
								  selectedKey: "sap_belize",
								  items: [
									  new Item({key: "sap_belize", text: "Belize"}),
									  new Item({key: "sap_belize_plus", text: "Belize Deep"}),
									  new Item({key: "sap_belize_hcb", text: "Belize HCB"}),
									  new Item({key: "sap_belize_hcw", text: "Belize HCW"})
								  ],
								  change: function (oEvent) {
									  var oSelectedTheme = oEvent.getParameter("selectedItem"),
										  bIsBelize,
										  oContrastContainerToggleBtn;

									  Theming.setTheme(oSelectedTheme.getKey());

									  bIsBelize = ["sap_belize", "sap_belize_plus"].indexOf(oSelectedTheme.getKey()) > -1;

									  oContrastContainerToggleBtn = Element.getElementById("settingsContrastContainer");
									  oContrastContainerToggleBtn.setVisible(bIsBelize);
									  oContrastContainerToggleBtn.setPressed(false);
									  jQuery("body").toggleClass("sapContrast", false);
									  jQuery("body").toggleClass("sapContrastPlus", false);
								  }
							  }),
						  new ToggleButton("settingsContrastContainer",
							  {
								  text: "Contrast",
								  press: function (oEvent) {
									  var oSelectedTheme = Element.getElementById("settingsThemeName").getSelectedItem();

									  var sContrastContainer = oSelectedTheme.getKey().indexOf("plus") > -1 ? "sapContrastPlus" : "sapContrast";
									  jQuery("body").toggleClass(sContrastContainer, this.getPressed());
								  }
							  })
					  ]
				  })
			  ]
		  })]
  }).placeAt("beforecontent");

  //As Popover
  new Panel({
	  headerText: "As Popover",
	  expandable: true,
	  expanded: true,
	  content: generateColorPalettePopoverElements()
  }).placeAt("content");

  //Default Color Palette in standalone mode
  new Panel({
	  headerText: "Default Standalone",
	  expandable: true,
	  expanded: true,
	  content: [
		  new Input({placeholder: " focus placeholder"}),
		  new HBox({
			  items: [
				  new ColorPalette({
					  colorSelect: handleColorSelect
				  }),
				  new ColorPalette({
					  colorSelect: handleColorSelect,
					  colors: [
						  "red",
						  "#ffff00"
					  ]
				  }),
				  new ColorPalette({
					  colorSelect: handleColorSelect,
					  colors: [
						  "red",
						  "#ffff00",
						  "green",
						  "hsl(350, 60%, 60%)",
						  "lightblue",
						  "#a811ff",
						  "hsl(120, 80%, 80%)",
						  "black",
						  "#ffaa00",
						  "hsl(20, 100%, 70%)",
						  "white",
						  "aqua"
					  ]
				  })]
		  })
	  ]
  }).placeAt("content");

  //Standalone Color Palette with custom color
  new Panel({
	  headerText: "Standalone with custom colors",
	  expandable: true,
	  content: [
		  new ColorPalette("cpCustomColors", {
			  colors: [
				  "red",
				  "#ffff00",
				  "green",
				  "hsl(350, 60%, 60%)",
				  "lightblue",
				  "#a811ff",
				  "hsl(120, 80%, 80%)",
				  "black",
				  "#ffaa00",
				  "hsl(20, 100%, 70%)",
				  "white",
				  "aqua",
				  "lime",
				  "teal",
				  "purple"
			  ],
			  colorSelect: handleColorSelect
		  }),
		  generateColorPaletteCustomColorItems("cpCustomColors")

	  ]
  }).placeAt("content");


  //In a HBox with other elements
  new Panel({
	  headerText: "Standalone in a HBox with other elements",
	  expandable: true,
	  content: generateColorPaletteWithOtherElements()
  }).placeAt("content");


  //In a Simple form with other elements
  new Panel({
	  headerText: "Standalone in a SimpleForm with other elements and private aggregations",
	  expandable: true,
	  content: generateColorPaletteInSimpleForm()
  }).placeAt("content");


  function generateColorPaletteCustomColorItems(sColorPaletteId) {
	  var oPanel,
		  oColorPaletteItemsSelection,
		  oColorPalettePopover = Element.getElementById(sColorPaletteId);
	  var aDefaultColors = oColorPalettePopover.getColors();

	  oPanel = new Panel({
		  expandable: true,
		  headerText: "Edit custom colors"
	  });

	  oColorPaletteItemsSelection = new FlexBox("flexbox1", {
		  fitContainer: true,
		  wrap: "Wrap",
		  alignContent: "Stretch",
		  justifyContent: "Start"
	  });

	  aDefaultColors.forEach(function (sColor, i) {
		  var oHBox = new HBox({
			  items: [
				  new Input({enabled: false, width: "3rem", value: i.toString()}),
				  new Input({value: sColor}),
				  new Button({
					  icon: "sap-icon://delete",
					  press: function () {
						  oHBox.destroy();
					  }
				  })
			  ]
		  });
		  oHBox._bColor = true; //mark this box as one containing a color elements fo further use
		  oColorPaletteItemsSelection.addItem(oHBox);
	  });

	  oPanel.addContent(oColorPaletteItemsSelection);

	  //Add new input for color
	  oPanel.addContent(new Button({
		  text: "Add new",
		  press: function () {
			  oColorPaletteItemsSelection.addItem(new HBox({
				  items: [
					  new Input({
						  enabled: false,
						  width: "3rem",
						  value: oColorPaletteItemsSelection.getItems().length - 1
					  }),
					  new Input({placeholder: "Enter value..."}),
					  new Button({
						  icon: "sap-icon://delete",
						  press: function () {
							  this.getParent().destroy(); //destroy the hbox
						  }
					  })
				  ]
			  }));
		  }
	  }));

	  oPanel.addContent(new Button({
		  text: "Set",
		  press: function () {
			  var aColors = [],
				  sOperationResult = "";

			  oColorPaletteItemsSelection.getItems().forEach(function (oItem) {
				  if (oItem._bColor) {
					  aColors.push(oItem.getItems()[1].getValue());
				  }
			  });

			  try {
				  oColorPalettePopover.setColors(aColors);
				  sOperationResult = "Successfully set total of " + aColors.length + " colors\n" + aColors;
			  } catch (e) {
				  sOperationResult = "Setting of " + aColors.length + " colors failed!\n" + aColors;
			  }

			  MessageBox.show(sOperationResult, {title: "Custom colors"});
		  }
	  }));

	  return oPanel;
  }

  function generateColorPaletteWithOtherElements() {
	  return new HBox(
		  {
			  items: [
				  new Label({text: "Label Before"}),
				  new ColorPalette({
					  colors: [
						  "#FFB200",
						  "#FF8C00",
						  "#CD5C5C",
						  "#8B008B",
						  "#6495ED",
						  "#00BFFF",
						  "#008B8B",
						  "#6B8E23",
						  "#2F4F4F",
						  "#F0FFFF",
						  "#FFF",
						  "#D3D3D3",
						  "#A9A9A9",
						  "#696969",
						  "#000"
					  ],
					  colorSelect: handleColorSelect
				  }),
				  new Label({text: "Label After"})
			  ]
		  }
	  );
  }

  function generateColorPaletteInSimpleForm() {
	  var oSimpleForm,
		  oColorPalette = new ColorPalette({
			  colors: [
				  "red",
				  "#ffff00",
				  "green",
				  "hsl(350, 60%, 60%)",
				  "lightblue",
				  "#a811ff",
				  "hsl(120, 80%, 80%)",
				  "black",
				  "#ffaa00",
				  "hsl(20, 100%, 70%)",
				  "#123456",
				  "#789101",
				  "#121314",
				  "#abcdef",
				  "#b0b015"
			  ],
			  colorSelect: handleColorSelect
		  });
	  oColorPalette._setDefaultColor("#FFFBBB");
	  oColorPalette._setShowDefaultColorButton(true);
	  oColorPalette._setShowMoreColorsButton(true);
	  oColorPalette._setShowRecentColorsSection(true);

	  oSimpleForm = new SimpleForm("SF2", {
		  maxContainerCols: 3,
		  editable: true,
		  backgroundDesign: BackgroundDesign.Transparent,
		  toolbar: new Toolbar("TB1", {
			  content: [
				  new Title("SF2-Title", {
					  text: "Editable SimpleForm with transparent background and Toolbars",
					  titleStyle: TitleLevel.H6
				  }),
				  new ToolbarSpacer(),
				  new Button({icon: "sap-icon://sap-ui5", tooltip: "SAPUI5"})
			  ]
		  }),
		  ariaLabelledBy: "SF2-Title",
		  content: [
			  new Label({text: "Label 1:"}),
			  new Input({value: "input 1"}),
			  new Label({text: "Label 2"}),
			  oColorPalette,
			  new Label({text: "Label 3"}),
			  new Input({placeholder: "Add your address"})

		  ]
	  });
	  oSimpleForm.addStyleClass("formBackground");

	  return oSimpleForm;
  }

  function generateColorPalettePopoverElements() {
	  var oCPPop, oCPPop2Colors, oCPPop7Colors;

	  oCPPop = new ColorPalettePopover("oCPPop", {
		  defaultColor: "red",
		  colorSelect: handleColorSelect
	  });

	  oCPPop2Colors = new ColorPalettePopover("kpop2", {
		  defaultColor: "black",
		  colors: [
			  "red",
			  "#ffff00"
		  ],
		  colorSelect: handleColorSelect
	  });

	  oCPPop7Colors = new ColorPalettePopover("oCPPop7Colors", {
		  showDefaultColorButton: false,
		  showMoreColorsButton: false,
		  colors: [
			  "red",
			  "#ffff00",
			  "green",
			  "hsl(350, 60%, 60%)",
			  "lightblue",
			  "#a811ff",
			  "black"
		  ],
		  colorSelect: handleColorSelect
	  });

	  return [
		  new HBox({
			  items: [
				  new CheckBox({
					  text: "Default Color ",
					  selected: true,
					  select: function (oEvent) {
						  oCPPop.setShowDefaultColorButton(oEvent.getParameter("selected"));
					  }
				  }),
				  new CheckBox({
					  text: "More Colors ",
					  selected: true,
					  select: function (oEvent) {
						  oCPPop.setShowMoreColorsButton(oEvent.getParameter("selected"));
					  }
				  }),
				  new CheckBox({
					  text: "Recent Colors",
					  selected: true,
					  select: function (oEvent) {
						  oCPPop.setShowRecentColorsSection(oEvent.getParameter("selected"));
					  }
				  }),
				  new Select("settingsDisplayModeoCPPop", {
					  selectedKey: "Default",
					  items: [
						  new Item({key: "Default", text: "Default"}),
						  new Item({key: "Simplified", text: "Simplified"}),
						  new Item({key: "Large", text: "Large"})
					  ],
					  change: function (oEvent) {
						  oCPPop.setDisplayMode(oEvent.getParameter("selectedItem").getKey());
					  }
				  }),
				  new Button({
					  text: "Open",
					  press: function () {
						  oCPPop.openBy(this);
					  }
				  })
			  ]
		  }),

		  new HBox({
			  items: [
				  new CheckBox({
					  text: "Default Color ",
					  selected: true,
					  select: function (oEvent) {
						  oCPPop2Colors.setShowDefaultColorButton(oEvent.getParameter("selected"));
					  }
				  }),
				  new CheckBox({
					  text: "More Colors ",
					  selected: true,
					  select: function (oEvent) {
						  oCPPop2Colors.setShowMoreColorsButton(oEvent.getParameter("selected"));
					  }
				  }),
				  new CheckBox({
					  text: "Recent Colors",
					  selected: true,
					  select: function (oEvent) {
						  oCPPop2Colors.setShowRecentColorsSection(oEvent.getParameter("selected"));
					  }
				  }),
				  new Select("settingsDisplayModeoCPPop2Colors", {
					  selectedKey: "Default",
					  items: [
						  new Item({key: "Default", text: "Default"}),
						  new Item({key: "Simplified", text: "Simplified"}),
						  new Item({key: "Large", text: "Large"})
					  ],
					  change: function (oEvent) {
						  oCPPop2Colors.setDisplayMode(oEvent.getParameter("selectedItem").getKey());
					  }
				  }),
				  new Button({
					  text: "Open 2",
					  press: function () {
						  oCPPop2Colors.openBy(this);
					  }
				  }),
				  new Button({
					  text: "Set color to: ",
					  press: function () {
						  oCPPop2Colors.setColorPickerSelectedColor(Element.getElementById("colorSelectInput").getValue());
					  }
				  }),
				  new Input({id:"colorSelectInput", placeholder: "Write a color.."})
			  ]
		  }),

		  new HBox({
			  items: [
				  new CheckBox({
					  text: "Default Color ",
					  selected: false,
					  select: function (oEvent) {
						  oCPPop7Colors.setShowDefaultColorButton(oEvent.getParameter("selected"));
					  }
				  }),
				  new CheckBox({
					  text: "More Colors ",
					  selected: false,
					  select: function (oEvent) {
						  oCPPop7Colors.setShowMoreColorsButton(oEvent.getParameter("selected"));
					  }
				  }),
				  new CheckBox({
					  text: "Recent Colors",
					  selected: false,
					  select: function (oEvent) {
						  oCPPop7Colors.setShowRecentColorsSection(oEvent.getParameter("selected"));
					  }
				  }),
				  new Select("settingsDisplayModeoCPPop7Colors", {
					  selectedKey: "Default",
					  items: [
						  new Item({key: "Default", text: "Default"}),
						  new Item({key: "Simplified", text: "Simplified"}),
						  new Item({key: "Large", text: "Large"})
					  ],
					  change: function (oEvent) {
						  oCPPop7Colors.setDisplayMode(oEvent.getParameter("selectedItem").getKey());
					  }
				  }),
				  new Button({
					  text: "Open 7",
					  press: function () {
						  oCPPop7Colors.openBy(this);
					  }
				  })
			  ]
		  })
	  ];
  }

  function handleColorSelect(oEvent) {
	  MessageToast.show("value: " + oEvent.getParameter("value") +
		  ", \n defaultAction: " + oEvent.getParameter("defaultAction"));
  }
});