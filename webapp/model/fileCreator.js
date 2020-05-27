sap.ui.define([
], function () {
    "use strict";
    

	return {
        invoiceObjToCSV: function(object, fileName) {

            var fileText = "";
            
            for (const property in object) {
                fileText += `${property},`;
            }

            fileText += '\n'

            for (const property in object) {
                fileText += `${object[property]},`;
            }

            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(fileText));
            element.setAttribute('download', fileName + '.csv');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
	};
});