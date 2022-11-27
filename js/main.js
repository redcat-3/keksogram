import {createPhotoDescription} from './util.js';
import {showPictures} from './picture.js';
import {setUploadChange, setOnFormSubmit} from './upload-form.js';
import {getDefaultValue} from './scale.js';
import {resetEffects} from './effects.js';

const pictures = Array.from({length: 11}, (_, index) => createPhotoDescription(index + 1));
showPictures(pictures);
setUploadChange();
setOnFormSubmit();
getDefaultValue();
resetEffects();
