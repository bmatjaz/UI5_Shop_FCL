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
			//this.oRouter.getRoute("categoryCart").attachPatternMatched(this._onProductMatched, this);
		},
		_onProductMatched: function (oEvent) {
			this._setLayout("Two");
			this.setCartButtonFalse();
			this.categoryId = oEvent.getParameter("arguments").categoryID;
			var _oTable = this.getView().byId("productsTable");
			var oTemplate = _oTable.getBindingInfo("items").template;
			var oBindingInfo = {
				path: "/Categories(" + this.categoryId + ")/Products",
				template: oTemplate,
			};
			_oTable.bindAggregation("items", oBindingInfo);
		},
		setCartButtonFalse: function() {
			var button = this.getView().byId("cartButton");
			if(button.getPressed()){
				button.setPressed(false);
				this._setToggleCartButton(false);
			}
		},
		openCart: function () {
			this.bPressed = this.getView().byId("cartButton");

			this.getView().getModel("commonData");
			var oModel = this.getView().getModel("commonData");
			var oModelCommonData = oModel.getData();

			if(this.categoryId == undefined)
				this.categoryId = 1;
				
			if(this.bPressed.getPressed()) {
				oModelCommonData.cartButonPressed = true;
				this._setLayout("Three");
				this.getRouter().navTo("categoryCart", {categoryID: this.categoryId})
			} 
			else {
				oModelCommonData.cartButonPressed = false;
				this._setLayout("Two");
				this.getRouter().navTo("category", {categoryID: this.categoryId})
			}
		},
		//selected product is sent to cart
		addToCart: function(oEvent) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oProduct = oEvent.getSource().getBindingContext().getObject();
			var oCartModel = this.getView().getModel("cartProducts");			
			cart.addToCart(oResourceBundle, oProduct, oCartModel);
			this.totalPrice();
		},
		getProductDetails: function(oEvent) {
			var button = this.getView().byId("cartButton");
			if(button.getPressed()){
				button.setPressed(false);
				this._setToggleCartButton(false);
			}

			if(this.categoryId == undefined)
				this.categoryId = 1;

			var oBindingContext = oEvent.getSource().getBindingContext();
			var sEntryId = oBindingContext.getObject().ProductID;
			this.oRouter.navTo("detail",
				{categoryID:this.categoryId, productID: sEntryId });
		}
	});
});