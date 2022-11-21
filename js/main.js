import {createPhotoDescription} from './util.js';
import {createPictureElement} from './picture.js';

const pictureElement = document.querySelector('.pictures');
const picture = createPhotoDescription(2);
pictureElement.append(createPictureElement(picture));

