const bodyElement = document.querySelector('body');
const canselButton = document.querySelector('.big-picture__cancel');
const picturesElement = document.querySelector('.pictures');
const templatePictureElement = document.querySelector('#picture').content.querySelector('.picture');
const fragmentListElements = document.createDocumentFragment();

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


function hideModal() {
  const modalElement = document.querySelector('.big-picture');
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
  canselButton.removeEventListener('click', onCanselButtonClick);
  bodyElement.style.overflow = 'auto';
}

const createPictureElement = (picture) => {
  const pictureElement = templatePictureElement.cloneNode(true);
  function onPictureClick () {
    const bigPictureElement = document.querySelector('.big-picture');
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;
    const socialComments = bigPictureElement.querySelector('.social__comments');
    const socialComment = socialComments.querySelector('.social__comment');
    socialComments.innerHTML = '';
    picture.comments.forEach((comment) => {
      socialComment.querySelector('.social__picture').src = comment.avatar;
      socialComment.querySelector('.social__picture').alt = comment.name;
      socialComment.querySelector('.social__text').textContent = comment.message;
      socialComments.appendChild(socialComment);
    });
    bigPictureElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
    document.addEventListener('keydown', onModalEscKeydown);
    canselButton.addEventListener('click', onCanselButtonClick);
  }

  pictureElement.querySelector('.picture__img').src = picture.url;
  if (picture.likes) {
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  }
  if (picture.comments) {
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  }

  pictureElement.appendChild(fragmentListElements);
  pictureElement.addEventListener('click', onPictureClick);
  picturesElement.append(pictureElement);
};

export {createPictureElement};
