sap.ui.define([
  "sap/ui/model/json/JSONModel",
  "sap/m/ObjectIdentifier",
  "sap/m/CheckBox",
  "sap/ui/core/library",
  "sap/m/Toolbar",
  "sap/m/Label",
  "sap/m/Column",
  "sap/m/ColumnListItem",
  "sap/m/Text",
  "sap/m/ObjectNumber",
  "sap/m/Table",
  "sap/m/App",
  "sap/m/Page"
], function(
  JSONModel,
  ObjectIdentifier,
  CheckBox,
  coreLibrary,
  Toolbar,
  Label,
  Column,
  ColumnListItem,
  Text,
  ObjectNumber,
  Table,
  App,
  Page
) {
  "use strict";

  // shortcut for sap.ui.core.TextDirection
  const TextDirection = coreLibrary.TextDirection;

  // Note: the HTML page 'ObjectIdentifier.html' loads this module via data-sap-ui-on-init

  var bCheckBoxSet = true;

  var oModel = new JSONModel({
	  "TextTrue": "TitleActive",
	  "true" : true,
	  "TextFalse" : "TitleNotActive",
	  "false" : false,
	  "formatterTest" : "dummyString",
	  "description1" : "Model sets true",
	  "description2" : "Model sets false",
	  "description3" : "Formatter sets true",
	  "description4" : ""
  });

  var oProductModel = new JSONModel({
	  "ProductCollection": [
		  {
			  "active": true,
			  "ProductId": "1239102",
			  "Name": "Power Projector 4713",
			  "Category": "Projector",
			  "SupplierName": "Titanium",
			  "Description": "A very powerful projector with special features for Internet usability, USB",
			  "Price": 856.49,
			  "CurrencyCode": "EUR"
		  },
		  {
			  "ProductId": "2212-121-828",
			  "Name": "Gladiator MX",
			  "Category": "Graphics Card",
			  "SupplierName": "Technocom",
			  "Description": "Gladiator MX: DDR2 RoHS 128MB Supporting 512MB Clock rate: 350 MHz Memory Clock: 533 MHz, Bus Type: PCI-Express, Memory Type: DDR2 Memory Bus: 32-bit Highlighted Features: DVI Out, TV Out , HDTV",
			  "Price": 81.7,
			  "CurrencyCode": "EUR"
		  },
		  {
			  "ProductId": "K47322.1",
			  "Name": "Hurricane GX",
			  "Category": "Graphics Card",
			  "SupplierName": "Red Point Stores",
			  "Description": "Hurricane GX: DDR2 RoHS 512MB Supporting 1024MB Clock rate: 550 MHz Memory Clock: 933 MHz, Bus Type: PCI-Express, Memory Type: DDR2 Memory Bus: 64-bit Highlighted Features: DVI Out, TV-In, TV-Out, HDTV",
			  "Price": 219,
			  "CurrencyCode": "EUR"
		  },
		  {
			  "ProductId": "KTZ-12012.V2",
			  "Name": "Deskjet Super Highspeed",
			  "Category": "Printer",
			  "SupplierName": "Red Point Stores",
			  "Description": "1200 dpi x 1200 dpi - up to 25 ppm (mono) / up to 24 ppm (colour) - capacity: 100 sheets - Hi-Speed USB2.0, Ethernet",
			  "Price": 117.19,
			  "CurrencyCode": "EUR"
		  },
		  {
			  "Name": "Laser Allround Pro",
			  "Category": "Printer",
			  "SupplierName": "Red Point Stores",
			  "Description": "Should be one line in height",
			  "Price": 39.99,
			  "CurrencyCode": "EUR"
		  },
		  {
			  "ProductId": "3123123.2",
			  "Category": "Monitor",
			  "SupplierName": "Very Best Screens",
			  "Description": "Should be one line in height",
			  "Price": 339,
			  "CurrencyCode": "EUR"
		  },
		  {
			  "ProductId": "",
			  "Category": "Monitor",
			  "SupplierName": "Very Best Screens",
			  "Description": "Should be one line in height",
			  "Price": 339,
			  "CurrencyCode": "EUR"
		  }
	  ]
	});

  var oi1 = new ObjectIdentifier("oi1", {
	  title : "Gummib\u00E4" + "r\u00E7" + "he\u00D1",
	  text : "Gummib\u00E4" + "r\u00E7" + "he\u00D1 bla bla bla bla bla bla bla bla bla silly table",
	  badgeNotes : true,
	  badgePeople : true,
	  badgeAttachments : true,
	  visible : true
  });

  var cb1 = new CheckBox("cb1", {
	  text : "Is visible",
	  visible : true,
	  selected : true,
	  select : function() {
		  bCheckBoxSet = !bCheckBoxSet;
		  oi1.setVisible(bCheckBoxSet);
	  }
  });

  var oi2 = new ObjectIdentifier("oi2", {
	  title : "Gummib\u00E4" + "r\u00E7" + "he\u00D1" + "are what I need most of all",
	  text : "Tiny Text",
	  badgeNotes : true,
	  badgePeople : true,
	  badgeAttachments : true,
	  visible : true
  });

  var oi3 = new ObjectIdentifier("oi3", {
	  title : "Gummib\u00E4" + "r\u00E7" + "he\u00D1" + "are what I need most of all",
	  titleActive : "{/true}",
	  text : "Tiny Text",
	  badgeNotes : true,
	  badgePeople : true,
	  badgeAttachments : true,
	  visible : true
  });

  var oi4 = new ObjectIdentifier("oi4", {
	  title : "{/TextTrue}",
	  text : "{/description1}",
	  titlePress: function() {
		  alert('ok');
	  },
	  titleActive : "{/true}"
  });

  var oi5 = new ObjectIdentifier("oi5", {
	  title : "{/TextFalse}",
	  text : "{/description2}",
	  titleActive : "{/false}"
  });

  var oi6 = new ObjectIdentifier("oi6", {
	  title: "{/TextTrue}",
	  text: "{/description3}",
	  titlePress: function() {
		  alert('ok');
	  },
	  titleActive: {
		  path: "/formatterTest",
		  formatter: function(e) {
			  return (e === "dummyString");
		  }
	  }
  });

  var oi7 = new ObjectIdentifier("oi7", {
	  title : "Model sets empty text",
	  text : "{/description4}"
  });

  var oi8 = new ObjectIdentifier("oi8", {
	  title : "OI with textDirection set to LTR",
	  text : "+49 (9) 1234567",
	  badgeNotes : true,
	  badgePeople : true,
	  badgeAttachments : true,
	  textDirection: TextDirection.LTR
  });


  var oTableHeader = new Toolbar({
	  content : [
		  new Label({
			  text : "Test ObjectIdentifier inside a Table"
		  })
	  ]
  });

  var aColumns = [
		  new Column({
			  header : new Label({
				  text : "Product"
			  })
		  }),
		  new Column({
			  header : new Label({
				  text : "Category"
			  })
		  }),
		  new Column({
			  header : new Label({
				  text : "Price"
			  })
		  })
	  ];

  var oTemplate = new ColumnListItem({
	  cells : [
		  new ObjectIdentifier({
			  title : "{Name}",
			  text : "{ProductId}",
			  titleActive : "{active}",
			  badgeNotes : true,
			  badgeAttachments : true,
			  emptyIndicatorMode: "On"
		  }),
		  new Text({
			  text : "{Category}"
		  }),
		  new ObjectNumber({
			  number : "{Price}",
			  unit : "{CurrencyCode}"
		  })
	  ]
  });

  var oTable = new Table({
	  headerToolbar : oTableHeader,
	  columns : aColumns
  });
  oTable.setModel(oProductModel);
  oTable.bindItems("/ProductCollection", oTemplate);

  var app = new App();
  var page = new Page({
	  showHeader : false,
	  enableScrolling : true
  });
  app.setInitialPage(page.getId());
  app.addPage(page);

  page.setModel(oModel);
  page.addContent(oi1);
  page.addContent(cb1);
  page.addContent(oi2);
  page.addContent(oi3);
  page.addContent(oi4);
  page.addContent(oi5);
  page.addContent(oi6);
  page.addContent(oi7);
  page.addContent(oi8);
  page.addContent(oTable);
  app.placeAt('body');
});