sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.App", {

		onInit : function () {
			var oViewModel;
			oViewModel = new JSONModel({
				delay : 0,
				layout : "TwoColumnsMidExpanded",
				smallScreenMode : true
			});
			this.setModel(oViewModel, "appView");
		}

	});
});