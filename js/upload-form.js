import {showModal} from './util.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const canselButton = uploadFormElement.querySelector('#upload-cancel');

const onUploadChange = () => {
  uploadOverlayElement.classList.remove('hidden');
  showModal(canselButton);
};

const setUploadChange = () => {
  uploadFileElement.addEventListener('change', onUploadChange);
};

export {setUploadChange};
