import {createPhotoDescription} from './util.js';
import {getData, sendData} from './api.js';
import {showPictures} from './picture.js';
import {setUploadChange, setOnFormSubmit} from './upload-form.js';
import {getDefaultValue} from './scale.js';
import {resetEffects} from './effects.js';
//import { getDefaultValue } from './scale.js';

const pictures = Array.from({length: 11}, (_, index) => createPhotoDescription(index + 1));
showPictures(pictures);
setUploadChange();
setOnFormSubmit(sendData);
getDefaultValue();
resetEffects();
