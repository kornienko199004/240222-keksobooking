'use strict';

(function () {

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка. Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + 'с');
    });
    xhr.timeout = 10000;
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
