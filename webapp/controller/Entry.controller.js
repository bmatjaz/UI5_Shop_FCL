sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.Entry", {

		onInit : function () {
			this.getRouter().getRoute("entry").attachMatched(function () {
				this._setLayout("One");
			}.bind(this));
		},
		goToShopSide: function() {
			this.getRouter().navTo("home");
		},
		goToBackend: function() {
			this.getRouter().navTo("orders");
		}

	});
});