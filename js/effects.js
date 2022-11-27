const EFFECTS = [
  {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
  },

  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const filterRangeElement = document.querySelector('.effect-level__slider');
const filterInputElement = document.querySelector('.effect-level__value');
const effectLevelBoxElement = document.querySelector('.img-upload__effect-level');
const formUploadElement = document.querySelector('.img-upload__form');
const filterPreviewElement = document.querySelector('.img-upload__preview img');
const effectsClass = 'effects__preview--';

const noneEffect = EFFECTS[0];
let chosenEffect = noneEffect;

filterInputElement.value = 0;

noUiSlider.create(filterRangeElement, {
  range: {
    min: noneEffect.min,
    max: noneEffect.max,
  },
  start: noneEffect.max,
  step: noneEffect.step,
  connect: 'lower',
});

const updateSlider = () => {
  isDefault();
  filterRangeElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
};

function isDefault () {
  if (chosenEffect === noneEffect) {
    effectLevelBoxElement.classList.add('hidden');
    filterPreviewElement.style.filter = 'none';
  } else {
    effectLevelBoxElement.classList.remove('hidden');
  }
}

const resetEffects = () => {
  chosenEffect = noneEffect;
  updateSlider();
};

formUploadElement.addEventListener('change', (event) => {
  if (event.target.classList.contains('effects__radio')) {
    filterPreviewElement.className = 'img-upload__preview';
    const effectsID = event.target.value;
    filterPreviewElement.classList.add(`${effectsClass}${effectsID}`);
    chosenEffect = EFFECTS.find((effect) => effect.name === effectsID);
    updateSlider();
  }
});

filterRangeElement.noUiSlider.on('update', () => {
  filterInputElement.value = filterRangeElement.noUiSlider.get();
  filterPreviewElement.style.filter = `${chosenEffect.filter}(${filterInputElement.value}${chosenEffect.unit})`;
}
);

export {resetEffects};
