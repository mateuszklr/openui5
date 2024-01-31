sap.ui.define([
	'sap/m/MessagePopover',
	'sap/m/MessageItem',
	'sap/m/MessageToast',
	"sap/ui/core/ElementRegistry",
	"sap/ui/core/Messaging",
	'sap/ui/core/message/Message',
	'sap/ui/core/library',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function(MessagePopover, MessageItem, MessageToast, ElementRegistry, Messaging, Message, coreLibrary, Controller, JSONModel) {
	"use strict";

	// shortcut for sap.ui.core.MessageType
	var MessageType = coreLibrary.MessageType;

	return Controller.extend("sap.m.sample.messageHandlingConcept.Controller", {
		onInit: function () {
			var oModel = new JSONModel("./localService/mockdata/FormsModel.json");

			this.oView = this.getView();
			this._MessageManager = Messaging;
			// Clear the old messages
			this._MessageManager.removeAllMessages();
			this.oView.setModel(oModel);

			this._MessageManager.registerObject(this.oView.byId("formContainer"), true);
			this.oView.setModel(this._MessageManager.getMessageModel(),"message");

			MessageToast.show('Press "Save" to trigger validation.');
			this.createMessagePopover();
		},

		handleMessagePopoverPress: function (oEvent) {
			if (!this.oMP) {
				this.createMessagePopover();
			}
			this.oMP.toggle(oEvent.getSource());
		},

		createMessagePopover: function () {
			var that = this;

			this.oMP = new MessagePopover({
				activeTitlePress: function (oEvent) {
					var oItem = oEvent.getParameter("item"),
						oPage = that.getView().byId("messageHandlingPage"),
						oMessage = oItem.getBindingContext("message").getObject(),
						oControl = ElementRegistry.get(oMessage.getControlId());

					if (oControl) {
						oPage.scrollToElement(oControl.getDomRef(), 200, [0, -100]);
						setTimeout(function(){
							oControl.focus();
						}, 300);
					}
				},
				items: {
					path:"message>/",
					template: new MessageItem(
						{
							title: "{message>message}",
							subtitle: "{message>additionalText}",
							groupName: {parts: [{path: 'message>controlIds'}], formatter: this.getGroupName},
							activeTitle: {parts: [{path: 'message>controlIds'}], formatter: this.isPositionable},
							type: "{message>type}",
							description: "{message>message}"
						})
				},
				groupItems: true
			});

			this.getView().byId("messagePopoverBtn").addDependent(this.oMP);
		},

		getGroupName : function (sControlId) {
			// the group name is generated based on the current layout
			// and is specific for each use case
			if (typeof sControlId !== "string") {
				return;
			}

			var oControl = ElementRegistry.get(sControlId);

			if (oControl) {
				var sFormSubtitle = oControl.getParent().getParent().getTitle().getText(),
					sFormTitle = oControl.getParent().getParent().getParent().getTitle();

				return sFormTitle + ", " + sFormSubtitle;
			}
		},

		isPositionable : function (sControlId) {
			// Such a hook can be used by the application to determine if a control can be found/reached on the page and navigated to.
			return sControlId ? true : true;
		},

		onChange: function (oEvent) {
			var oInput = oEvent.getSource();

			if (oInput.getRequired()) {
				this.handleRequiredField(oInput);
			}

			if (oInput.getLabels()[0].getText() === "Standard Weekly Hours") {
				this.checkInputConstraints(oInput);
			}
		},

		handleRequiredField: function (oInput) {
			var sTarget = oInput.getBindingContext().getPath() + "/" + oInput.getBindingPath("value");

			this.removeMessageFromTarget(sTarget);

			if (!oInput.getValue()) {
				this._MessageManager.addMessages(
					new Message({
						message: "A mandatory field is required",
						type: MessageType.Error,
						additionalText: oInput.getLabels()[0].getText(),
						target: sTarget,
						processor: this.getView().getModel()
					})
				);
			}
		},

		checkInputConstraints: function (oInput) {
			var oBinding = oInput.getBinding("value"),
				sValueState = "None",
				sTarget = oInput.getBindingContext().getPath() + "/" + oInput.getBindingPath("value");

			this.removeMessageFromTarget(sTarget);

			try {
				oBinding.getType().validateValue(oInput.getValue());
			} catch (oException) {
				sValueState = "Warning";
				this._MessageManager.addMessages(
					new Message({
						message: "The value should not exceed 40",
						type: MessageType.Warning,
						additionalText: oInput.getLabels()[0].getText(),
						description: "The value of the working hours field should not exceed 40 hours.",
						target: sTarget,
						processor: this.getView().getModel()
					})
				);
			}

			oInput.setValueState(sValueState);
		},

		removeMessageFromTarget: function (sTarget) {
			this._MessageManager.getMessageModel().getData().forEach(function(oMessage){
				if (oMessage.target === sTarget) {
					this._MessageManager.removeMessages(oMessage);
				}
			}.bind(this));
		},

		// Display the button type according to the message with the highest severity
		// The priority of the message types are as follows: Error > Warning > Success > Info
		buttonTypeFormatter: function () {
			var sHighestSeverity;
			var aMessages = this._MessageManager.getMessageModel().oData;
			aMessages.forEach(function (sMessage) {
				switch (sMessage.type) {
					case "Error":
						sHighestSeverity = "Negative";
						break;
					case "Warning":
						sHighestSeverity = sHighestSeverity !== "Negative" ? "Critical" : sHighestSeverity;
						break;
					case "Success":
						sHighestSeverity = sHighestSeverity !== "Negative" && sHighestSeverity !== "Critical" ?  "Success" : sHighestSeverity;
						break;
					default:
						sHighestSeverity = !sHighestSeverity ? "Neutral" : sHighestSeverity;
						break;
				}
			});

			return sHighestSeverity;
		},

		// Display the number of messages with the highest severity
		highestSeverityMessages: function () {
			var sHighestSeverityIconType = this.buttonTypeFormatter();
			var sHighestSeverityMessageType;

			switch (sHighestSeverityIconType) {
				case "Negative":
					sHighestSeverityMessageType = "Error";
					break;
				case "Critical":
					sHighestSeverityMessageType = "Warning";
					break;
				case "Success":
					sHighestSeverityMessageType = "Success";
					break;
				default:
					sHighestSeverityMessageType = !sHighestSeverityMessageType ? "Information" : sHighestSeverityMessageType;
					break;
			}

			return this._MessageManager.getMessageModel().oData.reduce(function(iNumberOfMessages, oMessageItem) {
				return oMessageItem.type === sHighestSeverityMessageType ? ++iNumberOfMessages : iNumberOfMessages;
			}, 0) || "";
		},

		// Set the button icon according to the message with the highest severity
		buttonIconFormatter: function () {
			var sIcon;
			var aMessages = this._MessageManager.getMessageModel().oData;

			aMessages.forEach(function (sMessage) {
				switch (sMessage.type) {
					case "Error":
						sIcon = "sap-icon://error";
						break;
					case "Warning":
						sIcon = sIcon !== "sap-icon://error" ? "sap-icon://alert" : sIcon;
						break;
					case "Success":
						sIcon = sIcon !== "sap-icon://error" && sIcon !== "sap-icon://alert" ? "sap-icon://sys-enter-2" : sIcon;
						break;
					default:
						sIcon = !sIcon ? "sap-icon://information" : sIcon;
						break;
				}
			});

			return sIcon;
		},

		_generateInvalidUserInput: function () {
			var oButton = this.getView().byId("messagePopoverBtn"),
				oRequiredNameInput = this.oView.byId("formContainer").getItems()[4].getContent()[2],
				oNumericZipInput = this.oView.byId("formContainer").getItems()[5].getContent()[7],
				oEmailInput = this.oView.byId("formContainer").getItems()[6].getContent()[13],
				iWeeklyHours = this.oView.byId("formContainerEmployment").getItems()[0].getContent()[13];

			oButton.setVisible(true);
			oRequiredNameInput.setValue("");
			oNumericZipInput.setValue("AAA");
			oEmailInput.setValue("MariaFontes.com");
			iWeeklyHours.setValue(400);

			this.handleRequiredField(oRequiredNameInput);
			this.checkInputConstraints(iWeeklyHours);

			this.oMP.getBinding("items").attachChange(function(oEvent){
				this.oMP.navigateBack();
				oButton.setType(this.buttonTypeFormatter());
				oButton.setIcon(this.buttonIconFormatter());
				oButton.setText(this.highestSeverityMessages());
			}.bind(this));

			setTimeout(function(){
				this.oMP.openBy(oButton);
			}.bind(this), 100);
		}
	});
});