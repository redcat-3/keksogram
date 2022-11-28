import { showSuccessMessage, showUploadErrorMessage } from './util.js';
import { hideForm } from './upload-form.js';

const getData = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => onFail('Произошла ошибка при загрузки данных'));
};

const sendData = (data) => {
  fetch(
    'https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  ) .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
    .then(() => {
      showSuccessMessage();
      hideForm();
    })
    .catch(() => {
      showUploadErrorMessage();
    });
};

export { getData, sendData };
