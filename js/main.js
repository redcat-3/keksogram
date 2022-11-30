import {showSuccessMessage, showUploadErrorMessage, showAlert, debounce} from './util.js';
import {getData, sendData} from './api.js';
import {showPictures} from './picture.js';
import {setUploadChange, setOnFormSubmit} from './upload-form.js';
import {getDefaultValue} from './scale.js';
import {resetEffects, onChangeEffect} from './effects.js';
import {setFilterClick, getFilterOn} from './filters.js';

setUploadChange();
getDefaultValue();
resetEffects();

const onGetDataSuccess = (photos) => {
  showPictures(photos);
  setFilterClick(photos, debounce(showPictures));
  getFilterOn();
};

const onSendDataSuccess = () => {
  resetEffects();
  showSuccessMessage();
  getData(onGetDataSuccess, showAlert);
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, showUploadErrorMessage, data);
});

getData(onGetDataSuccess, showAlert);
onChangeEffect();

