'use strict'
const axios = require('axios');
const API_KEY = 'bb0a99f4b08ed1';

const Geocode = (address) => {
  return axios(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${address}&format=json`)
  .then(res => {
    console.log(res.data)
    return res.data
  }).catch(err => {console.log(err)})
}

//this Geocoding API is crappy and can't even get the correct address from the addresses in the database. we probably need a paid Google Geocoding API account.

module.exports = Geocode;
