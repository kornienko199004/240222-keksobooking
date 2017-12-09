'use strict';

(function () {
  var KEY_ESCAPE = 27;
  /* Нахождение случайного числа в диапозоне от min до max  */
  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };
  /* Случайный порядок в массиве */
  var compareRandom = function () {
    return Math.random() - 0.5;
  };
  /* Случайный длина массива */
  var getRandomArray = function (array) {
    var copiedArray = array.slice();
    var lengthOfArray = getRandomInteger(1, array.length);
    copiedArray.sort(compareRandom);
    return copiedArray.splice(0, lengthOfArray);
  };
  window.utils = {
    getRandomInteger: getRandomInteger,
    compareRandom: compareRandom,
    getRandomArray: getRandomArray,
    KEY_ESCAPE: KEY_ESCAPE
  };
})();
