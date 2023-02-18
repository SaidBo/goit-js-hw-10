import './css/styles.css';
import debounce from 'lodash.debounce';
import SearchCountry from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const searchCountry = new SearchCountry();
let markup;

refs.inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  clearCountryList();

  searchCountry.country = e.target.value.trim();
  searchCountry.fetchCountries().then(data => createMarkup(data));
}

function createMarkup(data) {
  if (data.length >= 2 && data.length <= 10) {
    markup = data
      .map(
        ({ name, flags }) =>
          `<li class="country-item">
        <img class="country-flag" src="${flags.svg}" alt="${name}" width='60'/>&nbsp
        <p>${name.official}</p>
        
      </li>`
      )
      .join('');
    refs.countryList.innerHTML = markup;
  }
  if (data.length === 1) {
    markup = data
      .map(
        ({ name, capital, population, flags, languages }) =>
          `<img src="${flags.svg}" alt="${name}" width="60"/>
      <h1>${name.official}</h1>
      <h2>Capital: ${capital} </h2>
      <p>Population: ${population}</p>
      
      <p>Languages: ${Object.values(languages).join(', ')}</p>
    `
      )
      .join('');
    refs.countryInfo.innerHTML = markup;
  }
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
