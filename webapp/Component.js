sap.ui.define([
	"sap/ui/core/UIComponent",
	"./model/LocalStorageModel",
	"./model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, LocalStorageModel, models, JSONModel) {
	"use strict";

	return UIComponent.extend("sap.ui.flex.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this function, the device models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function () {
			//create and set cart model
			var oCartModel = new LocalStorageModel("SHOPPING_CART", {
				cartEntries: {},
				savedForLaterEntries: {}
			});
			this.setModel(oCartModel, "cartProducts");

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			var oCommonData = new JSONModel({
				cartButonPressed : false
			})
			this.setModel(oCommonData, "commonData")

			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// initialize the router
			this.getRouter().initialize();
		}
	});
});
