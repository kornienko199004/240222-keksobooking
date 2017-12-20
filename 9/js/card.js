'use strict';

(function () {

  var previousPopup = null;
  var closeBtn = null;

  var create = function (adsInfo) {
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
    element.querySelector('h3').textContent = adsInfo.offer.title;
    element.querySelector('p small').textContent = adsInfo.offer.address;
    element.querySelector('.popup__price').textContent = adsInfo.offer.price + '₽/ночь';
    element.querySelector('h4').textContent = adsInfo.offer.type;
    element.querySelectorAll('p')[2].textContent = adsInfo.offer.rooms + ' комнаты для ' + adsInfo.offer.guests + ' гостей';
    element.querySelectorAll('p')[3].textContent = 'Заезд после ' + adsInfo.offer.checkin + ', выезд до ' + adsInfo.offer.checkout;
    element.querySelector('.popup__features').textContent = '';
    element.querySelectorAll('p')[4].textContent = adsInfo.offer.description;
    getFeaturesList(adsInfo.offer.features);
    element.querySelector('img').setAttribute('src', adsInfo.author.avatar);
    return element;
  };

  var show = function (popup, container) {
    if (previousPopup) {
      container.removeChild(previousPopup);
    }
    previousPopup = popup;
    container.appendChild(popup);
  };

  var hide = function () {
    if (previousPopup) {
      previousPopup.classList.add('hidden');
    }
  };

  window.card = {
    create: create,
    closeBtn: closeBtn,
    show: show,
    hide: hide
  };
})();
