'use strict';

(function () {
  var pageMap = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var mapPinMain = pageMap.querySelector('.map__pin--main');
  var PIN_MAIN_SHIFT_Y = 54;
  // var rentData = window.generatedAds;

  var rentData = null;
  var onSuccess = function (arrData) {
    rentData = arrData.slice();
    for (var i = 0; i <= rentData.length - 1; i++) {
      rentData[i].id = i;
    }
    // console.log(rentData);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 3; margin: 0 auto; text-align: center; background-color: #ff5635; color: #fff; width: 800px; padding: 25px 0; border: 4px solid #fff;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '40px';
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  window.backend.load(onSuccess, onError);

  var fillMap = function () {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < rentData.length; i++) {
      fragment.appendChild(window.pin.create(rentData[i]));
    }
    mapPins.appendChild(fragment);
  };

  var closeAd = function () {
    window.pin.deactivate();
    window.card.hide();
  };

  var removeCloseListeners = function () {
    document.removeEventListener('keydown', onCloseEsc);
    window.card.closeBtn.removeEventListener('click', onCloseClick);
  };

  var onMainPinMouseup = function () {
    pageMap.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    window.form.enableFields();
    fillMap();
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pins.length; j++) {
      pins[j].addEventListener('click', onPinClick);
    }
    mapPinMain.removeEventListener('mouseup', onMainPinMouseup);
  };

  var onCloseEsc = function (evt) { // Функция навешивается на document и закрывает попап при нажатии на escape
    if (evt.keyCode === window.utils.KEY_ESCAPE) {
      closeAd();
      removeCloseListeners();
    }
  };

  var onCloseClick = function () { // функция, срабатывающая при нажатии на кнопку закрытия (клик или клавиша Enter)
    closeAd();
    removeCloseListeners();
  };

  var onPinClick = function (event) { // кнопка открытия попапа
    var currentPin = event.currentTarget; // пин, по которому кликнули
    window.pin.activate(currentPin);
    var id = currentPin.dataset.id; // заполняем и выводим попап.
    var currentPopup = window.card.create(rentData[id]);
    window.card.show(currentPopup, pageMap);
    window.card.closeBtn = currentPopup.querySelector('.popup__close');// находим кнопку закрытия
    window.card.closeBtn.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onCloseEsc);
  };

  mapPinMain.addEventListener('mouseup', onMainPinMouseup);
  var confineAddress = {
    min: 100,
    max: 500
  };
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      if ((mapPinMain.offsetTop - shift.y) >= (confineAddress.min + PIN_MAIN_SHIFT_Y) && (mapPinMain.offsetTop - shift.y) <= (confineAddress.max + PIN_MAIN_SHIFT_Y)) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }
      window.form.inputAddress.value = (mapPinMain.offsetTop - shift.y) + ', ' + (mapPinMain.offsetLeft - shift.x);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      pageMap.removeEventListener('mousemove', onMouseMove);
      pageMap.removeEventListener('mouseup', onMouseUp);
    };

    pageMap.addEventListener('mousemove', onMouseMove);
    pageMap.addEventListener('mouseup', onMouseUp);

  });
})();

