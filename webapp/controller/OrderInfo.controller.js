sap.ui.define([
	"./BaseController",
	"../model/formatter",
	"../model/fileCreator"
], function (BaseController, formatter, fileCreator) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.OrderInfo", {
		formatter: formatter,
		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("orderDetail").attachPatternMatched(this._onProductMatched, this);
		},
		//
		_onProductMatched: function (oEvent) {
			 var orderID = oEvent.getParameter("arguments").orderID;
			 this.getView().bindElement("/Orders(" + orderID + ")");
		},
		exportCSV: function(oEvent) {
			var object = oEvent.getSource().getBindingContext().getObject();
			fileCreator.invoiceObjToCSV(object, "Invoice");
		}
	});
});