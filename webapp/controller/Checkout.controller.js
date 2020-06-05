sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox",
	"../model/formatter",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, formatter, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ui.flex.controller.Checkout", {
        formatter: formatter,
		
		//creating model for data needed for checkout
        onInit : function () {
			this._oHistory = {
				prevPaymentSelect: null,
				prevDiffDeliverySelect: null
			};
			var oModel = new JSONModel(
				{
					SelectedPayment: "Credit Card",
					CashOnDelivery: {
						FirstName: "asdfdsaf",
						LastName: "asdfadsf",
						PhoneNumber: "213423",
						Email: "dfsgfdsg@asd.si"
					},
					InvoiceAddress: {
						Address: "asdfasd",
						City: "sadfds",
						ZipCode: "23432",
						Country: "dfgsdfg",
						Note: "sfdgsfdg"
					},
					DeliveryAddress: {
						Address: "dfgfds",
						Country: "dsfgfsdg",
						City: "fdsgfdsg",
						ZipCode: "2345",
						Note: "sdfgfds"
					},
					CreditCard: {
						Name: "fdsgfdg",
						CardNumber: "32544353535353535",
						SecurityCode: "324",
						Expire: "05/2020"
					}
				}
			);
			this.getView().setModel(oModel);

            this.getRouter().getRoute("checkout").attachMatched(function () {
				this._setLayout("One");
			}.bind(this));
		},
		onPressMasterBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home");

			// resets Wizard and sets it to first step after returning to previous views
			var oWizard = this.getView().byId("shoppingCartWizard");
			this._navToWizardStep(this.byId("paymentTypeStep"));
			oWizard.discardProgress(oWizard.getSteps()[0]);
		},
		goToDeliveryAddress: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("addressinput");
		},
		/**
		 * Shows next WizardStep according to user selection
		 */
		goToPaymentStep: function () {
			var selectedKey = this.getView().getModel().getProperty("/SelectedPayment");
			var oElement = this.getView().byId("paymentTypeStep");
			switch (selectedKey) {
				case "Bank Transfer":
					oElement.setNextStep(this.getView().byId("bankAccountStep"));
					break;
				case "Cash on Delivery":
					oElement.setNextStep(this.getView().byId("cashOnDeliveryStep"));
					break;
				case "Credit Card":
				default:
					oElement.setNextStep(this.getView().byId("creditCardStep"));
					break;
			}
		},
		/**
		 * Shows warning message if user changes previously selected payment method
		 */
		setPaymentMethod: function () {
			this._setDiscardableProperty({
				message: this.getView().getModel("i18n")
					.getResourceBundle().getText("messageForPaymentMethodChange"),
				discardStep: this.getView().byId("paymentTypeStep"),
				modelPath: "/SelectedPayment",
				historyPath: "prevPaymentSelect"
			});
		},
		/**
		 * Checks the corresponding step after activation to decide whether the user can proceed or needs
		 * to correct the input
		 */
		onCheckStepActivation: function(oEvent) {
			var sWizardStepId = oEvent.getSource().getId();
			switch (sWizardStepId) {
			case this.createId("creditCardStep"):
				this.checkCreditCardStep();
				break;
			case this.createId("cashOnDeliveryStep"):
				this.checkCashOnDeliveryStep();
				break;
			case this.createId("invoiceStep"):
				this.checkInvoiceStep();
				break;
			case this.createId("deliveryAddressStep"):
				this.checkDeliveryAddressStep();
				break;
			}
		},
		/**
		 * Called from  Wizard on <code>complete</code>
		 * Navigates to the summary page in case there are no errors
		 */
		checkCompleted: function () {
				this.byId("wizardNavContainer").to(this.getView().byId("summaryPage"));
		},
		/**
		 * Validates the credit card step initially and after each input
		 */
		checkCreditCardStep: function () {
			this._checkStep("creditCardStep", ["creditCardHolderName", "creditCardNumber", "creditCardSecurityNumber", "creditCardExpirationDate"]);
		},
		/**
		 * Validates the cash on delivery step initially and after each input
		 */
		checkCashOnDeliveryStep: function () {
			this._checkStep("cashOnDeliveryStep", ["cashOnDeliveryName" , "cashOnDeliveryLastName", "cashOnDeliveryPhoneNumber"]);
		},
		/**
		 * Validates the invoice step initially and after each input
		*/
		checkInvoiceStep: function () {
			this._checkStep("invoiceStep", ["invoiceAddressAddress", "invoiceAddressCity", "invoiceAddressZip", "invoiceAddressCountry"]);
		},
		/**
		 * Hides button to proceed to next WizardStep if validation conditions are not fulfilled
		 * @param {string} sStepName - the ID of the step to be checked
		 * @param {array} aInputIds - Input IDs to be checked
		 * @private
		 */
		_checkStep: function (sStepName, aInputIds) {
			var oWizard = this.getView().byId("shoppingCartWizard"),
				oStep = this.getView().byId(sStepName),
				bEmptyInputs = this._checkInputFields(aInputIds),
				bValidationError = !!sap.ui.getCore().getMessageManager().getMessageModel().getData().length;

			if (!bValidationError && !bEmptyInputs) {
				oWizard.validateStep(oStep);
			} else {
				oWizard.invalidateStep(oStep);
			}
		},
		/**
		 * Checks if one or more of the inputs are empty
		 * @param {array} aInputIds - Input ids to be checked
		 * @returns {boolean}
		 * @private
		 */
		_checkInputFields : function (aInputIds) {
			var oView = this.getView();
			return aInputIds.some(function (sInputId) {
				var oInput = oView.byId(sInputId);
				var oBinding = oInput.getBinding("value");
				try {
					oBinding.getType().validateValue(oInput.getValue());
					oInput.setValueState("None");
				} catch (oException) {
					oInput.setValueState("Error");
					return true;
				}
				return false;
			});
		},		
		/**
		 * Called from both <code>setPaymentMethod</code> and <code>setDifferentDeliveryAddress</code> functions.
		 * Shows warning message if user changes previously selected choice
		 * @private
		 * @param {Object} oParams Object containing message text, model path and WizardSteps
		 */
		_setDiscardableProperty: function (oParams) {
			var oWizard = this.getView().byId("shoppingCartWizard");
			if (oWizard.getProgressStep() !== oParams.discardStep) {
				MessageBox.warning(oParams.message, {
					actions: [MessageBox.Action.YES,
						MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.YES) {
							oWizard.discardProgress(oParams.discardStep);
							this._oHistory[oParams.historyPath] = this.getView().getModel().getProperty(oParams.modelPath);
						} else {
							this.getModel().setProperty(oParams.modelPath, this._oHistory[oParams.historyPath]);
						}
					}.bind(this)
				});
			} else {
				this._oHistory[oParams.historyPath] = this.getView().getModel().getProperty(oParams.modelPath);
			}
		},
		/**
		 * Called from <code>ordersummary</code>
		 * shows warning message and submits order if confirmed
		 */
		handleWizardSubmit: function () {
			var sText = "Are you shure?";
			this._handleSubmitOrCancel(sText, "confirm", "orderConfirmation");
		},
		/**
		 * Called from <code>ordersummary</code>
		 * shows warning message and cancels order if confirmed
		 */
		handleWizardCancel: function () {
			var sText = "You shure you want to cancle";
			this._handleSubmitOrCancel(sText, "warning", "home");
		},
		_handleSubmitOrCancel: function (sMessage, sMessageBoxType, sRoute) {
			MessageBox[sMessageBoxType](sMessage, {
				actions: [MessageBox.Action.YES,
					MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.YES) {
						// resets Wizard
						var oWizard = this.getView().byId("shoppingCartWizard");
						this._navToWizardStep(this.byId("paymentTypeStep"));
						oWizard.discardProgress(oWizard.getSteps()[0]);

						var oModel = this.getView().getModel();

						var oCartModel = this.getOwnerComponent().getModel("cartProducts");
						
						var oModelData = oModel.getData();
						oModelData.SelectedPayment = "Credit Card";
						oModelData.CashOnDelivery = {};
						oModelData.InvoiceAddress = {};
						oModelData.DeliveryAddress = {};
						oModelData.CreditCard = {};
						oModel.setData(oModelData);
						//all relevant cart properties are set back to default. Content is deleted.
						var oCartModelData = oCartModel.getData();
						oCartModelData.cartEntries = {};
						oCartModel.setData(oCartModelData);
						this.getOwnerComponent().getRouter().navTo(sRoute);
					}
				}.bind(this)
			});
		},
		/**
		 * navigates to WizardStep
		 * @private
		 * @param {Object} oStep WizardStep DOM element
		 */
		_navToWizardStep: function (oStep) {
			var oNavContainer = this.byId("wizardNavContainer");
			var _fnAfterNavigate = function () {
				this.byId("shoppingCartWizard").goToStep(oStep);
				// detaches itself after navigaton
				oNavContainer.detachAfterNavigate(_fnAfterNavigate);
			}.bind(this);

			oNavContainer.attachAfterNavigate(_fnAfterNavigate);
			oNavContainer.to(this.byId("overviewWizard"));
		}
	});
});