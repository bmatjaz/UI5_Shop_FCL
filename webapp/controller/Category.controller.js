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
			//check if cart is open on load (in case of page refresh)
			this.buttonCheck();
		},
		buttonCheck: function() {
			if((window.location.href).slice(-5)=="/cart") {
				var button = this.getView().byId("cartButton");
				button.setPressed(true);
			} else {
				var button = this.getView().byId("cartButton");
				button.setPressed(false);
			}
		},
		//when view is opened get all products based on category
		_onProductMatched: function (oEvent) {
			this.buttonCheck();
			this._setLayout("Two");

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
			this.bPressed = oEvent.getParameter("pressed");
			this._setLayout(this.bPressed  ? "Three" : "Two");
			this.getRouter().navTo(this.bPressed  ? ("categoryCart") : ("category", {categoryID: this.categoryId}));
		},
		//selected product is sent to cart
		addToCart: function(oEvent) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oProduct = oEvent.getSource().getBindingContext().getObject();
			var oCartModel = this.getView().getModel("cartProducts");			
			cart.addToCart(oResourceBundle, oProduct, oCartModel);
		},
		getProductDetails: function(oEvent) {
			var button = this.getView().byId("cartButton");
			if(button.getPressed()){
				button.setPressed(false);
			}
			var oBindingContext = oEvent.getSource().getBindingContext();
			var sEntryId = oBindingContext.getObject().ProductID;
			this.oRouter.navTo("detail",
				{categoryID:this.categoryId, productID: sEntryId });
		}
	});
});