const MIN = 0;
const MAX = 100;
const STEP = 25;

const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview');
const imageElement = imagePreviewElement.querySelector('img');

let scale;

const changePictureSize = () => {
  imagePreviewElement.style.transform = `scale(${scale / 100})`;
  imageElement.style.transform = `scale(${scale / 100})`;
  scaleValueElement.value = `${scale}%`;
};

const getDefaultValue = () => {
  scale = MAX;
  changePictureSize();
};

scaleSmallerElement.addEventListener('click', () => {
  if (scale > MIN) {
    scale -= STEP;
  }
  changePictureSize();
});

scaleBiggerElement.addEventListener('click', () => {
  if (scale < MAX) {
    scale += STEP;
  }
  changePictureSize();
});

export {getDefaultValue};
