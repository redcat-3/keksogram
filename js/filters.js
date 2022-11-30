import {sortDiscussed, getRandomArray} from './util.js';
import {clearPictures} from './picture.js';

const COUNT_RANDOM_PHOTO = 10;

const filterForm = document.querySelector('.img-filters');

const getFilterOn = () => filterForm.classList.remove('img-filters--inactive');

const getFilterOff = () => filterForm.classList.add('img-filters--inactive');

const toggleFilter = (choosen) => {
  const currentFilter = document.querySelector('.img-filters__button--active');
  currentFilter.classList.remove('img-filters__button--active');
  choosen.classList.add('img-filters__button--active');
};

const setFilterClick = (data, cb) => {
  filterForm.addEventListener('click', (evt) => {
    clearPictures();
    switch (evt.target.id) {
      case 'filter-random':
        toggleFilter(evt.target);
        cb(getRandomArray(data).slice(0, COUNT_RANDOM_PHOTO));
        break;

      case 'filter-discussed':
        toggleFilter(evt.target);
        cb(sortDiscussed(data));
        break;

      case 'filter-default':
        toggleFilter(evt.target);
        cb(data);
        break;
    }
  });
};

export {setFilterClick, getFilterOn, getFilterOff};
