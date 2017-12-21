'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMG_WIDTH = '40'; // px
  var IMG_HEIGHT = '44'; // px

  var formNotice = document.querySelector('.notice__form');
  var fileChoosers = document.querySelectorAll('.upload input[type=file]');
  var dropZoneImages = formNotice.querySelectorAll('.drop-zone');
  var avatarZone = dropZoneImages[0];
  var avatarUser = formNotice.querySelector('.notice__preview img');
  var photoZone = dropZoneImages[1];
  var uploadPhoto = formNotice.querySelector('.form__photo-container');

  // Добавление фотографий на форму
  var upLoadImage = function (evt, getFile, showMiniFile) {
    var files = getFile(evt);
    [].forEach.call(files, function (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (element) {
        return fileName.endsWith(element);
      });
      if (matches) {
        var imageLoader = new FileReader();
        imageLoader.addEventListener('load', function (e) {
          showMiniFile(e.target.result);
        });
        imageLoader.readAsDataURL(file);
      }
    });
  };
  // Получаем файл фото при перетаскивании
  var getDraggedFile = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    evt.dataTransfer.dropEffect = 'copy';
    return files;
  };
  // Получаем файл фото через диалог
  var getDialogFile = function (evt) {
    return evt.target.files;
  };
  // Показываем миниатюры на форме
  var showMiniAvatar = function (content) {
    avatarUser.src = content;
  };
  var showMiniPhoto = function (content) {
    var img = document.createElement('IMG');
    img.width = IMG_WIDTH;
    img.height = IMG_HEIGHT;
    img.style = 'margin: 10px';
    uploadPhoto.appendChild(img);
    img.src = content;
  };
  // Добавляем файлы через окно выбора файлов
  var onChooserAvatarChange = function (evt) {
    upLoadImage(evt, getDialogFile, showMiniAvatar);
  };
  var onChooserPhotoChange = function (evt) {
    upLoadImage(evt, getDialogFile, showMiniPhoto);
  };
  // Добавляем перетаскиваемые файлы
  var onAvatarZoneDrop = function (evt) {
    upLoadImage(evt, getDraggedFile, showMiniAvatar);
  };
  var onPhotoZoneDrop = function (evt) {
    upLoadImage(evt, getDraggedFile, showMiniPhoto);
  };
  // Разрешаем процесс перетаскивания фотографий в дроп-зону
  var onDropZoneDragenter = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };
  var onDropZoneDragover = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };

  // События сброса фото-файлов в drop-зоне
  avatarZone.addEventListener('drop', onAvatarZoneDrop);
  photoZone.addEventListener('drop', onPhotoZoneDrop);
  [].forEach.call(dropZoneImages, function (element) {
    element.addEventListener('dragenter', onDropZoneDragenter);
  });
  [].forEach.call(dropZoneImages, function (element) {
    element.addEventListener('dragover', onDropZoneDragover);
  });
  // Событие изменения выборщиков файлов для загрузки
  fileChoosers[0].addEventListener('change', onChooserAvatarChange);
  fileChoosers[1].addEventListener('change', onChooserPhotoChange);
})();
