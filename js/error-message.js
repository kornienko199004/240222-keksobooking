'use strict';

(function () {

  var TIME_OUT = 3000; // 3 секунды

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 3; margin: 0 auto; text-align: center; background-color: #ff5635; color: #fff; width: 800px; padding: 25px 0; border: 4px solid #fff;';
    node.style.position = 'fixed';
    node.style.left = '0';
    node.style.right = '0';
    node.style.top = '40px';
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      document.body.removeChild(node);
    }, TIME_OUT);
  };

  window.message = {
    onError: onError
  };
})();
