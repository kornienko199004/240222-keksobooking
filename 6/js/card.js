'use strict';

(function () {
  var previousPopup = null;
  var closeBtn = null;
  var create = function (adsinfo) {
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
    previousPopup.classList.add('hidden');
  };
  window.card = {
    create: create,
    show: show,
    hide: hide,
    closeBtn: closeBtn
  }
  ;
})();
