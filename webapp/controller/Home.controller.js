sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.Home", {

		onInit : function () {
            var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
			this._router.getRoute("home").attachMatched(this._onRouteMatched, this);
        },
        
        _onRouteMatched: function() {
			var bSmallScreen = this.getModel("appView").getProperty("/smallScreenMode");
			if (bSmallScreen) {
				this._setLayout("Two");
			}
		},
		onListItemPress:function(oEvent) {
			this.categoryID = oEvent.getSource().getBindingContext().getProperty("CategoryID");
			this._router.navTo("category", {categoryID: this.categoryID});
			this._unhideMiddlePage();
		},
		changeLanguage: function(oEvent) {
            var oValidatedComboBox = oEvent.getSource(),
            sSelectedKey = oValidatedComboBox.getSelectedKey(),
            language = window.navigator.userLanguage || window.navigator.language;

            if(sSelectedKey=="default") {
                sap.ui.getCore().getConfiguration().setLanguage(language);
            }
            else {
                sap.ui.getCore().getConfiguration().setLanguage(sSelectedKey);
            }
		},
		onBackToEntry: function() {
			this.getModel("commonData").setProperty("/cartButonPressed", false);
			this._router.navTo("entry");
		}
	});
});