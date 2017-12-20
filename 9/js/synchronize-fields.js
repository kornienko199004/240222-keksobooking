'use strict';
(function () {

  window.synchronizeFields = function (firstField, secondField, firstArray, secondArray, syncValues) {
    var index = firstArray.indexOf(firstField.value);
    syncValues(secondField, secondArray[index]);
  };
})();

