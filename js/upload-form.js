import {onUploadChange} from './util.js';

const SEPARATOR = ' ';
const MAX_COUNT_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;

const uploadFormElement = document.querySelector('#upload-select-image');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const simbolHashtag = /^#[a-zа-яё0-9]{1,19}/i;

const checkValidHashtag = (hashtag) => simbolHashtag.test(hashtag);

const pristine = new Pristine(
  uploadFormElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTag: 'div',
    errorTextClass: 'text',
  },
  true
);

const validateSymbolsHashtag = (value) => {
  const hashtagsArray = value.trim().split(SEPARATOR);
  return hashtagsArray.every(checkValidHashtag);
};

const validateDoubleHashtag = (value) => {
  const lowerCaseTags = value.map((values) => values.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateCountHashtag = (value) => value.length <= MAX_COUNT_HASHTAGS;

const validateTags = (value) => {
  const hashtagsArray = value.trim().split(SEPARATOR).filter((tag) => tag.trim().length);
  return hashtagsArray.every(validateSymbolsHashtag);
};

const validateTagDouble = (value) => {
  const hashtagsArray = value.trim().split(SEPARATOR).filter((tag) => tag.trim().length);
  return validateDoubleHashtag(hashtagsArray);
};

const validateTagCountHashtag = (value) => {
  const hashtagsArray = value.trim().split(SEPARATOR).filter((tag) => tag.trim().length);
  return validateCountHashtag(hashtagsArray);
};

pristine.addValidator(hashtagElement, validateTags, `Хэштег должен начинаться с # и не содержать спецсимволов. Максимальная длина хэштега ${MAX_LENGTH_HASHTAG} символов.`);
pristine.addValidator(hashtagElement, validateTagCountHashtag, `Разрешено использовать не более ${MAX_COUNT_HASHTAGS} хэштегов.`);
pristine.addValidator(hashtagElement, validateTagDouble, 'Хэштеги не должны дублироваться');

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
