import {showBigPicture} from './big-picture.js';

const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const imageFiltersElement = document.querySelector('.img-filters');

const clearPictures = () => {
  const pictureElements = document.querySelectorAll('.picture');
  if (pictureElements.length > 0) {
    pictureElements.forEach((picture) => picture.remove());
  }
};

const createPicture = ({url, description, comments, likes}) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = `${comments.length}`;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  pictureElement.addEventListener('click', () => {
    showBigPicture({url, description, comments, likes});
  });

  return pictureElement;
};

const container = document.querySelector('.pictures');

const showPictures = (pictures) => {
  clearPictures();
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    container.append(pictureElement);
    imageFiltersElement.classList.remove('img-filters--inactive');
  });
};

export {showPictures};
