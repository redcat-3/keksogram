const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('#upload-select-image');
const textareaElement = uploadFormElement.querySelector('.text__description');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const canselButtonElement = uploadFormElement.querySelector('#upload-cancel');

const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if ((max - min) === 0) {
    return NaN;
  }
  const result = Math.random() * (max - min);
  if ((max - min) > 0) {
    return Math.round(result + min);
  }
  return Math.round(max - result);
};

const checkStringLength = (string, length) => string.length <= length;

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Оливер',
  'Симба',
  'Макси',
  'Майло',
  'Боуи',
  'Рокки',
  'Смоки',
  'Джек',
];

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

const createComment = (index) => {
  const comment = {
    id: 135,
    avatar: 'img/avatar-6.svg',
    message: 'В целом всё неплохо. Но не всё.',
    name: 'Артём',
  };
  comment.id = index;
  comment.avatar = `img/avatar-${getRandomNumber(1, 6)}.svg`;
  comment.message = getRandomArrayElement(messages);
  comment.name = getRandomArrayElement(names);
  return comment;
};

const createPhotoDescription = (number) => {
  const photoDescription = {
    id: 1,
    url: '',
    description: '',
    likes: 0,
    comments: []
  };
  photoDescription.id = number;
  photoDescription.url = `photos/${number}.jpg`;
  photoDescription.description = 'массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.';
  photoDescription.likes = getRandomNumber(15, 200);
  const numberOfComments = getRandomNumber(0, 10);
  photoDescription.comments = Array.from({length: numberOfComments}, (_, index) => createComment(index + 1));
  return photoDescription;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
};

const onCanselButtonClick = () => {
  hideModal();
};

const onTextFocus = () => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      console.log(4);
    }
  });
};

function hideModal() {
  let canselButton;
  let modalElement = document.querySelector('.big-picture');
  if (!modalElement.classList.contains('hidden')) {
    canselButton = document.querySelector('.big-picture__cancel');
  } else {
    modalElement = document.querySelector('.img-upload__overlay');
    if (!modalElement.classList.contains('hidden')) {
      canselButton = document.querySelector('#upload-cancel');
      document.querySelector('#upload-file').value = '';
      textareaElement.removeEventListener('focus', onTextFocus);
      hashtagElement.removeEventListener('focus', onTextFocus);
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

const onUploadChange = () => {
  uploadOverlayElement.classList.remove('hidden');
  showModal(canselButtonElement);
  textareaElement.addEventListener('focus', onTextFocus);
  hashtagElement.addEventListener('focus', onTextFocus);
};

export {createPhotoDescription, checkStringLength, isEscapeKey, onModalEscKeydown, onCanselButtonClick, showModal, onUploadChange};
