sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.Welcome", {

		onInit : function () {
            this.getRouter().attachRouteMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
			var sRouteName = oEvent.getParameter("name");
			// always display two columns for home screen
			if (sRouteName === "home") {
				this._setLayout("Two");
			}
		},
		openCart: function (oEvent) {
			var bPressed = oEvent.getParameter("pressed");
			this._setLayout(bPressed ? "Three" : "Two");
			this.getRouter().navTo(bPressed ? "welcomeCart" : "home");
		}
	});
});