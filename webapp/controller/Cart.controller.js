sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox",
	"../model/formatter",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, formatter, JSONModel) {
	"use strict";

	var sCartModelName = "cartProducts";
	var sCartEntries = "cartEntries";

	return BaseController.extend("sap.ui.flex.controller.Category", {
		formatter: formatter,

		onInit: function () {
			this._oRouter = this.getRouter();
			this._oRouter.getRoute("welcomeCart").attachPatternMatched(this._routePatternMatched, this);
			this._oRouter.getRoute("categoryCart").attachPatternMatched(this._routePatternMatched, this);

			var oModel = new JSONModel({
				totalPriceInShoppingCart: 0
			})
			this.getView().setModel(oModel);
		},
		_routePatternMatched: function (oEvent) {
			this.totalPrice();
			this._setLayout("Three");
			this.categoryId = oEvent.getParameter("arguments").categoryID;
		},
		//whenever cart opens call function totalPrice to get sum of all product prices in cart
		_onObjectMatched: function() {
			this.totalPrice();
		},

		/*
			deleting selected item from shopping cart and refreshing price in cart
		*/
		delete: function(oEvent) {
			var oBindingContext = oEvent.getSource().getBindingContext(sCartModelName);

			var sEntryId = oBindingContext.getObject().ProductID;

			// show confirmation dialog
			MessageBox.show("Item will be removed from cart", {
				title: "Removing item",
				actions: [
					MessageBox.Action.DELETE,
					MessageBox.Action.CANCEL
				],
				onClose: function (oAction) {
					if (oAction !== MessageBox.Action.DELETE) {
						return;
					}
					var oCartModel = oBindingContext.getModel();
					var oCollectionEntries = Object.assign({}, oCartModel.getData()[sCartEntries]);

					delete oCollectionEntries[sEntryId];

					// update model
					oCartModel.setProperty("/" + sCartEntries, Object.assign({}, oCollectionEntries));
					this.totalPrice();
				}.bind(this)
			});
		},
		//function to calculate price of all items in cart
		totalPrice: function() {
			var oCartModel = this.getOwnerComponent().getModel("cartProducts").getData().cartEntries;
			var totalPrice = 0;
			
			for (var key in oCartModel) {
				totalPrice += oCartModel[key].Quantity * oCartModel[key].UnitPrice
			}
			var oModel = this.getView().getModel();
			var oModelData = oModel.getData();
			oModelData.totalPriceInShoppingCart = totalPrice;
			oModel.setData(oModelData);
		},
		onProceedButtonPress: function() {
			this._oRouter.navTo("checkout");
		},
		goToDetails: function(oEvent) {
			var oBindingContext = oEvent.getSource().getBindingContext(sCartModelName);
			var sEntryId = oBindingContext.getObject().ProductID;
			if(this.categoryId == undefined)
				this.categoryId = 1;
			this._oRouter.navTo("detail",
				{categoryID:this.categoryId, productID: sEntryId });
		}
	});
});