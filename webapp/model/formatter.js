sap.ui.define([
	"sap/ui/core/format/NumberFormat"
], function (NumberFormat) {
	"use strict";

	var formatter = {
		/**
		 * Formats the price
		 * @param {string} sValue model price value
		 * @return {string} formatted price
		 */
		price: function (sValue) {
			var numberFormat = NumberFormat.getFloatInstance({
				maxFractionDigits: 2,
				minFractionDigits: 2,
				groupingEnabled: true,
				groupingSeparator: ".",
				decimalSeparator: ","
			});
			return numberFormat.format(sValue);
		},

		isDiscontinued: function(sValue) {
			if(sValue)
				return "Discontinued";
			else
				return "Avaliable"
		},

		dateFormat: function (sValue) {
			if(sValue) {
				var day = sValue.getDate(),
					month = sValue.getMonth(),
					year = sValue.getFullYear();

				var date = day + "." + month + "." + year;
				return date;
			}
			else
				return null;
		}
	};
	return formatter;
});