sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.Orders", {
		onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
		},
		onListItemPress: function(oEvent) {
			var orderID = oEvent.getSource().getBindingContext().getProperty("OrderID");
			this._setLayout("Two");
			this.oRouter.navTo("orderInformation", {orderID: orderID});
		},
		onBackToEntry: function() {
			this.oRouter.navTo("entry");
		},
		changeLanguage: function(oEvent) {
            var oValidatedComboBox = oEvent.getSource(),
            sSelectedKey = oValidatedComboBox.getSelectedKey(),
            language = window.navigator.userLanguage || window.navigator.language;

            if(sSelectedKey=="default") {
                sap.ui.getCore().getConfiguration().setLanguage(language);
            }
            else {
                sap.ui.getCore().getConfiguration().setLanguage(sSelectedKey);
            }
		},
	});
});