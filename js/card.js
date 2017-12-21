'use strict';

(function () {

  var previousPopup = null;
  var closeBtn = null;

  var getFeaturesList = function (element, features) {
    var featuresList = element.querySelector('.popup__features');
    var featureItem = document.createDocumentFragment();
    for (var j = 0; j <= features.length - 1; j++) {
      var newElement = document.createElement('li');
      newElement.className = 'feature feature--' + features[j];
      featureItem.appendChild(newElement);
    }
    featuresList.appendChild(featureItem);
  };

  var renderPhotos = function (photos, popupPhotos) {
    var fragment = document.createDocumentFragment();
    popupPhotos.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
      var listElement = document.createElement('li');
      var imageElement = document.createElement('img');
      imageElement.style = 'width: 42px; height: 42px; margin: 5px';
      imageElement.setAttribute('src', photos[i]);
      listElement.appendChild(imageElement);
      fragment.appendChild(listElement);
    }
    popupPhotos.appendChild(fragment);
  };

  var create = function (adsInfo) {
    var template = document.querySelector('template');
    var mapCard = template.content.querySelector('.map__card');
    var element = mapCard.cloneNode(true);
    var popupPhotos = element.querySelector('.popup__pictures');
    element.querySelector('.popup__features').textContent = '';
    element.querySelector('h3').textContent = adsInfo.offer.title;
    element.querySelector('p small').textContent = adsInfo.offer.address;
    element.querySelector('.popup__price').textContent = adsInfo.offer.price + '₽/ночь';
    element.querySelector('h4').textContent = adsInfo.offer.type;
    element.querySelectorAll('p')[2].textContent = adsInfo.offer.rooms + ' комнаты для ' + adsInfo.offer.guests + ' гостей';
    element.querySelectorAll('p')[3].textContent = 'Заезд после ' + adsInfo.offer.checkin + ', выезд до ' + adsInfo.offer.checkout;
    element.querySelector('.popup__features').textContent = '';
    element.querySelectorAll('p')[4].textContent = adsInfo.offer.description;
    element.querySelector('img').setAttribute('src', adsInfo.author.avatar);
    getFeaturesList(element, adsInfo.offer.features);
    renderPhotos(adsInfo.offer.photos, popupPhotos);
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
