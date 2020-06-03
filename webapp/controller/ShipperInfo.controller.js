sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("sap.ui.flex.controller.ShipperInfo", {
		formatter: formatter,

		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("orderInformation").attachPatternMatched(this._onProductMatched, this);
		},
		//when view is opened get all products based on category
		_onProductMatched: function (oEvent) {
			var orderID = oEvent.getParameter("arguments").orderID;
			this.getView().bindElement("/Orders(" + orderID + ")");
		}
	});
});