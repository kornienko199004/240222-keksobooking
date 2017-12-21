'use strict';

(function () {

  var TIME_OUT = 10000;
  var TIME_OUT_SEC = 10;
  var GOOD_REQUEST = 200;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === GOOD_REQUEST) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка. Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIME_OUT_SEC + 'с');
    });
    xhr.timeout = TIME_OUT;
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', 'https://1510.dump.academy/keksobooking/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', 'https://1510.dump.academy/keksobooking');
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
