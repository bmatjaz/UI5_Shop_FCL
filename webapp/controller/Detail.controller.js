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
			this._setLayout("Three");
			var productId = oEvent.getParameter("arguments").productID;
			this.getView().bindElement("/Products(" + productId + ")");
		},
		addToCart: function(oEvent) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oProduct = oEvent.getSource().getBindingContext().getObject();
			var oCartModel = this.getView().getModel("cartProducts");			
			cart.addToCart(oResourceBundle, oProduct, oCartModel);
		},
		backToProducts: function (oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("cart", true);
			}
		},
		goTocart: function(oEvent) {
			var sCategoryId = oEvent.getSource().getBindingContext().getProperty("CategoryID");
			this._oRouter.navTo("cart", {categoryID: sCategoryId});
		}
	});
});
