sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.flex.controller.OrderDetail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			this.oRouter = oOwnerComponent.getRouter();
			this.oRouter.getRoute("orderInformation").attachPatternMatched(this._onProductMatched, this);
		},
		_onProductMatched: function (oEvent) {
            this.orderID = oEvent.getParameter("arguments").orderID;
            var _oTable = this.getView().byId("orderedItems");
			var oTemplate = _oTable.getBindingInfo("items").template;
			var oBindingInfo = {
				path: "/Orders(" + this.orderID + ")/Order_Details",
				template: oTemplate,
			};
			_oTable.bindAggregation("items", oBindingInfo);
		},
		goToDetails: function(oEvent) {
			this.orderID = oEvent.getSource().getBindingContext().getProperty("OrderID");
			this.sProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
			this.oRouter.navTo("orderProductDetail",
				{orderID:this.orderID, productID: this.sProductId });		
		} 
	});
});