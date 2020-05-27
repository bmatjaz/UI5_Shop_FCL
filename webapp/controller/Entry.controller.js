sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.Entry", {

		onInit : function () {
			this._oRouter = this.getRouter();
			this._oRouter.getRoute("entry").attachPatternMatched(this._routePatternMatched, this);
		},
		_routePatternMatched: function () {
			this._setLayout("One");
		},
		goToShopSide: function() {
			this.getRouter().navTo("home");
		},
		goToBackend: function() {
			this.getRouter().navTo("orders");
		}

	});
});