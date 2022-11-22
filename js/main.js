import {createPhotoDescription} from './util.js';
import {createPictureElement} from './picture.js';
import {setUploadChange} from './upload-form.js';

const picture = createPhotoDescription(1);
createPictureElement(picture);
setUploadChange();
