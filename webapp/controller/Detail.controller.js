sap.ui.define([
	"./BaseController",
	"../model/formatter",
	"../model/cart",
	"sap/ui/core/routing/History"
], function (BaseController, formatter, cart, History) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.Detail", {
		formatter: formatter,

		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("detail").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(oEvent) {
			//this._setToggleCartButton(false);
			this.getModel("commonData").setProperty("/cartButonPressed", false);

			this._setLayout("Three");
			this.categoryId = oEvent.getParameter("arguments").categoryID
			var productId = oEvent.getParameter("arguments").productID;
			this.getView().bindElement("/Products(" + productId + ")");
		},
		addToCart: function(oEvent) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oProduct = oEvent.getSource().getBindingContext().getObject();
			var oCartModel = this.getView().getModel("cartProducts");			
			cart.addToCart(oResourceBundle, oProduct, oCartModel);
		},
		backToProducts: function () {
			this._oRouter.navTo("category", {categoryID:this.categoryId})
		},
		cartButtonSetup: function() {
			
		}
	});
});
