export const ENDPOINTS = {
  COUNTRIES: 'https://api.covid19api.com/countries',
  DETAILS: slug =>
    `https://api.covid19api.com/total/dayone/country/${slug}/status/confirmed`,
};
