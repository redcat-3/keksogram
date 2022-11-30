const ALERT_SHOW_TIME = 700;
const TIMEOUT_DELAY = 500;

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('#upload-select-image');
const textareaElement = uploadFormElement.querySelector('.text__description');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');

const checkStringLength = (string, length) => string.length <= length;

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArray = (array) => {
  const randomArray = [0];
  let element = getRandomArrayElement(array);
  for (let i = 0; i < array.length; i++) {
    while (randomArray.includes(element)) {
      element = getRandomArrayElement(array);
    }
    randomArray[i] = element;
  }
  return randomArray;
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const checkForFocus = () => document.activeElement === hashtagElement || document.activeElement === textareaElement;

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !checkForFocus()) {
    evt.preventDefault();
    hideModal();
  }
};

const onCanselButtonClick = () => {
  hideModal();
};

function hideModal() {
  let canselButton = document.querySelector('.big-picture__cancel');
  let modalElement = document.querySelector('.big-picture');
  if (!modalElement.classList.contains('hidden')) {
    canselButton = document.querySelector('.big-picture__cancel');
  } else {
    modalElement = document.querySelector('.img-upload__overlay');
    if (!modalElement.classList.contains('hidden')) {
      canselButton = document.querySelector('#upload-cancel');
      document.querySelector('#upload-file').value = '';
    }
  }
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
  canselButton.removeEventListener('click', onCanselButtonClick);
  bodyElement.classList.remove('modal-open');
}

const showModal = (canselButton) => {
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
  canselButton.addEventListener('click', onCanselButtonClick);
};

const showMessage = (message, button) => {
  document.body.append(message);

  const close = () => {
    message.remove();
    window.removeEventListener('keydown', onMessagelEscDown);
    hideModal();
  };

  button.addEventListener('click', () => {
    close();
  });

  message.addEventListener('click', (evt) => {
    if(evt.target === message){
      close();
    }
  });

  function onMessagelEscDown(evt) {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      close();
    }
  }
  window.addEventListener('keydown', onMessagelEscDown);
};

const showSuccessMessage = () => {
  const message = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const button = message.querySelector('.success__button');
  showMessage(message, button);
};

const showUploadErrorMessage = () => {
  const message = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const button = message.querySelector('.error__button');
  showMessage(message, button);
};

const showAlert = (message) => {
  const alertElement = document.createElement('div');
  alertElement.style.position = 'absolute';
  alertElement.style.zIndex = '100';
  alertElement.style.left = '0';
  alertElement.style.top = '0';
  alertElement.style.right = '0';
  alertElement.style.padding = '10px 3px';
  alertElement.style.fontSize = '30px';
  alertElement.style.textAlign = 'center';
  alertElement.style.backgroundColor = 'red';
  alertElement.textContent = message;
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const comparePhotos = (photoA, photoB) => {
  const commentA = photoA.comments.length;
  const commentB = photoB.comments.length;
  return commentB - commentA;
};

const sortDiscussed = (photos) => photos.slice().sort(comparePhotos);

export {checkStringLength,
  isEscapeKey,
  getRandomArray,
  onModalEscKeydown,
  onCanselButtonClick,
  showModal,
  showSuccessMessage,
  showUploadErrorMessage,
  hideModal,
  showAlert,
  sortDiscussed,
  debounce
};
