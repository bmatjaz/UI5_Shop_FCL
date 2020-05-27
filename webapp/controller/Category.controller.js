sap.ui.define([
	"./BaseController",
	"../model/formatter",
	"../model/cart"
], function (BaseController, formatter, cart) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.Category", {
		formatter: formatter,
		
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			this.oRouter = oOwnerComponent.getRouter();
			this.oRouter.getRoute("category").attachPatternMatched(this._onProductMatched, this);
		},
		//when view is opened get all products based on category
		_onProductMatched: function (oEvent) {
			this.categoryId = oEvent.getParameter("arguments").categoryID;
			var _oTable = this.getView().byId("productsTable");
			var oTemplate = _oTable.getBindingInfo("items").template;
			var oBindingInfo = {
				path: "/Categories(" + this.categoryId + ")/Products",
				template: oTemplate,
			};
			_oTable.bindAggregation("items", oBindingInfo);
		},
		openCart: function (oEvent) {
			var bPressed = oEvent.getParameter("pressed");
			this._setLayout(bPressed ? "Three" : "Two");
			this.getRouter().navTo(bPressed ? ("categoryCart") : ("category", {categoryID: this.categoryId}));
		},
		//selected product is sent to cart
		addToCart: function(oEvent) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oProduct = oEvent.getSource().getBindingContext().getObject();
			var oCartModel = this.getView().getModel("cartProducts");			
			cart.addToCart(oResourceBundle, oProduct, oCartModel);
		},
		getProductDetails: function(oEvent) {
			var oBindingContext = oEvent.getSource().getBindingContext();
			var sEntryId = oBindingContext.getObject().ProductID;
			this.oRouter.navTo("detail",
				{categoryID:"1", productID: sEntryId });
		}
	});
});