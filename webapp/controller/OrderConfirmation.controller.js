sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.OrderConfirmation", {
		
		//onInit calls orderConfirmation target and sets layout to two colums
        onInit : function () {
            this.getRouter().getRoute("orderConfirmation").attachMatched(function () {
				this._setLayout("Two");
			}.bind(this));
		}
	});
});