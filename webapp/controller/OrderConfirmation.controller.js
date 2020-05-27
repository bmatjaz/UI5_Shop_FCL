sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox",
	"../model/formatter",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, formatter, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.Checkout", {
        formatter: formatter,
		
		//creating model for data needed for checkout
        onInit : function () {
            this.getRouter().getRoute("orderConfirmation").attachMatched(function () {
				this._setLayout("One");
			}.bind(this));
		}
	});
});