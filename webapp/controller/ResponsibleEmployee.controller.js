sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.flex.controller.ResponsibleEmployee", {
		onInit: function () {
			
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("orderDetail").attachPatternMatched(this._onProductMatched, this);
		},
		//when view is opened get all products based on category
		_onProductMatched: function (oEvent) {
			var orderID = oEvent.getParameter("arguments").orderID;
			this.getView().bindElement("/Orders(" + orderID + ")/Employee");
		}
	});
});