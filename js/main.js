import {createPhotoDescription} from './util.js';
import {showPictures} from './picture.js';
import {setUploadChange, setOnFormSubmit} from './upload-form.js';

const pictures = Array.from({length: 11}, (_, index) => createPhotoDescription(index + 1));
showPictures(pictures);
setUploadChange();
setOnFormSubmit();
