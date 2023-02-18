import Notiflix from 'notiflix';

export default class SearchCountry {
  constructor() {
    this.name = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this.name}?fields=name,capital,population,flags,languages`;

    return fetch(url)
      .then(r => {
        if (!r.ok) {
          throw new Error(
            Notiflix.Notify.failure('Oops, there is no country with that name')
          );
        }
        return r.json();
      })
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        return data;
      })
      .catch(error => console.log(error));
  }

  get country() {
    return this.name;
  }

  set country(newCountry) {
    this.name = newCountry;
  }
}

// const START_URL = 'https://restcountries.com/v3.1/name';
// const OPTIONS = '?fields=name,capital,population,flags,languages';

// export function fetchCountries(name) {
//   return fetch(`${START_URL}/${name}${OPTIONS}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
