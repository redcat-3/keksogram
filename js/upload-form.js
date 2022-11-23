import {showModal} from './util.js';

const SEPARATOR = ' ';

const uploadFormElement = document.querySelector('#upload-select-image');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const canselButtonElement = uploadFormElement.querySelector('#upload-cancel');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const hashtag = /^#[a-zа-яё0-9]{1,19}/i;

const pristine = new Pristine(
  uploadFormElement,
  {
    classTo: 'img-upload__form',
    errorTextParent: 'img-upload__field-wrapper',
    errorTag: 'div',
  },
  true
);

const validateHashtag = () => {
  const hashtags = hashtagElement.value.split(SEPARATOR);
  if (hashtagElement.value) {
    if (hashtags.length >= 5) {
      return false;
    }
    for (let i = 0; i < hashtags.length; i++) {
      return hashtag.test(hashtags[i]);
    }
  } else {
    return true;
  }
};

pristine.addValidator(
  hashtagElement,
  validateHashtag,
  'Неправильный хэш-тег'
);

const onUploadChange = () => {
  uploadOverlayElement.classList.remove('hidden');
  showModal(canselButtonElement);
};

const setUploadChange = () => {
  uploadFileElement.addEventListener('change', onUploadChange);
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Сохранить';
};

const setOnFormSubmit = () => {
  uploadFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      //await cb (new FormData(evt.target));

      unblockSubmitButton();
    }
    uploadFileElement.value = '';
  });
};


export {setUploadChange, setOnFormSubmit};
