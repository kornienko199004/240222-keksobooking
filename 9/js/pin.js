'use strict';
(function () {

  var SHIFT_Y = 41;

  var previousPin = null;

  var create = function (info) {
    var template = document.querySelector('template');
    var mapPin = template.content.querySelector('.map__pin');
    var mapElement = mapPin.cloneNode(true);
    mapElement.style.top = (info.location.y - SHIFT_Y) + 'px';
    mapElement.style.left = info.location.x + 'px';
    mapElement.querySelector('img').src = info.author.avatar;
    mapElement.setAttribute('data-id', info.id);
    return mapElement;
  };
  var activate = function (currentPin) {
    currentPin.classList.add('map__pin--active'); // вешаем на него класс active
    if (previousPin) {
      previousPin.classList.remove('map__pin--active'); // если до этого нажимали на пин, то удаляем из него класс active
    }
    previousPin = currentPin; // записываем наш текущий пин в предыдущий.
  };

  var deactivate = function () {
    previousPin.classList.remove('map__pin--active');
  };

  window.pin = {
    create: create,
    activate: activate,
    deactivate: deactivate
  };
})();
