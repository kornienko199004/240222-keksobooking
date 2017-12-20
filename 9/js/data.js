'use strict';

(function () {
  /* Генерация фотографий */
  var generatePhotos = function (numberOfPhotos) {
    var photos = [];
    for (var i = 1; i <= numberOfPhotos; i++) {
      photos[i] = 'img/avatars/user0' + i + '.png';
    }
    return photos;
  };
  /* Генерируем массив с объектами */
  var generateAds = function () {
    var ads = [];
    var homeTypeNames = [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ].sort(window.utils.compareRandom);
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var types = ['квартира', 'дом', 'бунгало'];
    var checkins = ['12:00', '13:00', '14:00'];
    var checkouts = ['12:00', '13:00', '14:00'];
    var profilePhotos = generatePhotos(8).sort(window.utils.compareRandom);

    var x = null;
    var y = null;

    /* генерация объектов для массива */
    for (var i = 0; i <= 7; i++) {
      x = window.utils.getRandomInteger(300, 900);
      y = window.utils.getRandomInteger(100, 500);
      ads[i] = {
        'id': i,
        'author': {
          'avatar': profilePhotos[i]
        },
        'offer': {
          'title': homeTypeNames[i],
          'address': x + ', ' + y,
          'price': window.utils.getRandomInteger(1000, 1000000),
          'type': types[window.utils.getRandomInteger(0, types.length - 1)],
          'rooms': window.utils.getRandomInteger(1, 5),
          'guests': window.utils.getRandomInteger(1, 10),
          'checkin': checkins[window.utils.getRandomInteger(0, checkins.length - 1)],
          'checkout': checkouts[window.utils.getRandomInteger(0, checkouts.length - 1)],
          'features': window.utils.getRandomArray(features)
        },
        'location': {
          x: x,
          y: y
        }
      };
    }

    return ads;
  };
  window.generatedAds = generateAds();
})();


