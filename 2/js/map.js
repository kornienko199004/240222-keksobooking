'use strict';

function generateAds() {
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
  ].sort(compareRandom);
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var types = ['квартира', 'дом', 'бунгало'];
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var profilePhotos = generatePhotos(8).sort(compareRandom);

  var x = null;
  var y = null;

  for (var i = 0; i <= 7; i++) {
    x = getRandomInteger(300, 900);
    y = getRandomInteger(100, 500);
    ads[i] = {
      'author': {
        'avatar': profilePhotos[i]
      },
      'offer': {
        'title': homeTypeNames[i],
        'address': x + ', ' + y,
        'price': getRandomInteger(1000, 1000000),
        'type': types[getRandomInteger(0, types.length - 1)],
        'rooms': getRandomInteger(1, 5),
        'guests': getRandomInteger(1, 10),
        'checkin': checkins[getRandomInteger(0, checkins.length - 1)],
        'checkout': checkouts[getRandomInteger(0, checkouts.length - 1)],
        'features': getRandomArray(features)
      },
      'location': {
        x: x,
        y: y
      }
    };
  }

  return ads;
}

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

/* Нахождение случайного числа в диапозоне от min до max  */


function compareRandom() {
  return Math.random() - 0.5;
}

/* Случайный порядок в массиве */

function getRandomArray(array) {
  var copiedArray = array.slice();
  var lengthOfArray = getRandomInteger(1, array.length);
  copiedArray.sort(compareRandom);
  return copiedArray.splice(0, lengthOfArray);
}

function generatePhotos(numberOfPhotos) {
  var photos = [];
  for (var i = 1; i <= numberOfPhotos; i++) {
    photos[i] = 'img/avatars/user0' + i + '.png';
  }
  return photos;
}

var pageMap = document.querySelector('.map');
pageMap.classList.remove('map--faded');

var rentData = generateAds();

var createPin = function (info) {
  var mapPin = document.querySelector('.map__pin');
  var mapElement = mapPin.cloneNode(true);
  mapElement.style.top = info.location.y + 'px';
  mapElement.style.left = info.location.x + 'px';
  mapElement.querySelector('img').src = info.author.avatar;
  return mapElement;
};

var fillMap = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < rentData.length; i++) {
    fragment.appendChild(createPin(rentData[i]));
  }
  mapPins.appendChild(fragment);
};

function createPopup(adsinfo) {
  var template = document.querySelector('template');
  var mapCard = template.content.querySelector('.map__card');
  var element = mapCard.cloneNode(true);
  element.querySelector('.popup__features').textContent = '';
  var getFeaturesList = function (features) {
    var featuresList = element.querySelector('.popup__features');
    var featureItem = document.createDocumentFragment();
    for (var j = 0; j <= features.length - 1; j++) {
      var newElement = document.createElement('li');
      newElement.className = 'feature feature--' + features[j];
      featureItem.appendChild(newElement);
    }
    featuresList.appendChild(featureItem);
  };
  element.querySelector('h3').textContent = adsinfo.offer.title;
  element.querySelector('p small').textContent = adsinfo.offer.address;
  element.querySelector('.popup__price').textContent = adsinfo.offer.price + '₽/ночь';
  element.querySelector('h4').textContent = adsinfo.offer.type;
  element.querySelectorAll('p')[2].textContent = adsinfo.offer.rooms + ' комнаты для ' + adsinfo.offer.guests + ' гостей';
  element.querySelectorAll('p')[3].textContent = 'Заезд после ' + adsinfo.offer.checkin + ', выезд до ' + adsinfo.offer.checkout;
  element.querySelector('.popup__features').textContent = '';
  getFeaturesList(adsinfo.offer.features);
  element.querySelector('img').setAttribute('src', adsinfo.author.avatar);
  pageMap.appendChild(element);
}

createPopup(rentData[0]);
fillMap();

