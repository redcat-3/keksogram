import {isEscapeKey} from './util.js';

const MAX_COUNT_COMMENT = 5;

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const canselButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsBlockElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentListElement = bigPictureElement.querySelector('.social__comments');

let count = 0;

const createComment = (commentator) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');
  comment.querySelector('.social__picture').src = commentator.avatar;
  comment.querySelector('.social__picture').alt = commentator.name;
  comment.querySelector('.social__text').textContent = commentator.message;

  return comment;
};

const showBigPicture = (info) => {

  const showComments = () => {
    commentListElement.innerHTML = '';
    const fragmentElement = document.createDocumentFragment();
    const commentsVisible = info.comments.slice(0, count + MAX_COUNT_COMMENT);
    commentsVisible.forEach((comment) => {
      const commentElement = createComment(comment);
      fragmentElement.append(commentElement);
    });
    commentListElement.append(fragmentElement);
    commentsLoaderElement.classList.toggle('hidden', info.comments.length === commentsVisible.length);
    commentsBlockElement.textContent = `${commentsVisible.length} из ${info.comments.length} комментариев`;
  };

  const OnClickcommentsLoader = () => {
    count += MAX_COUNT_COMMENT;
    showComments();
  };

  bigPictureElement.querySelector('.big-picture__img img').src = info.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = info.description;
  bigPictureElement.querySelector('.likes-count').textContent = info.likes;
  bigPictureElement.querySelector('.social__caption').textContent = info.description;

  const hideBigPicture = () => {
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    commentsLoaderElement.removeEventListener('click', OnClickcommentsLoader);
    document.removeEventListener('keydown', onEscKeydown);
    count = 0;
  };
  const onCloseButtonClick = () => hideBigPicture();
  function onEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hideBigPicture();
    }
  }
  const addListeners = () => {
    canselButtonElement.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onEscKeydown);
  };

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  showComments(info.comments);
  addListeners();
  commentsLoaderElement.addEventListener('click', OnClickcommentsLoader);
};

export {showBigPicture};

