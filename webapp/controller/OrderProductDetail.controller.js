sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"../model/cart"
], function (Controller, formatter, cart) {
	"use strict";

	return Controller.extend("sap.ui.flex.controller.OrderProductDetail", {
		formatter: formatter,

		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("orderProductDetail").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(oEvent) {
			var productId = oEvent.getParameter("arguments").productID;
			this.getView().bindElement("/Products(" + productId + ")");
		}
	});
});
