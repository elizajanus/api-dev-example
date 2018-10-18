'use strict'
const axios = require('axios');
const BING_API_KEY = 'AiJpMvYFMIP7EhgIkXwG8T2FrzPAM_5IbW2wBfjqMENTd8nzvVrGyxcLB298r9Dm';

//these seem a tiny bit off, will probably need a paid Google Geocode API account, this is a free Bing account

const Geocode = (address) => {
  return axios(`http://dev.virtualearth.net/REST/v1/Locations?query=${address}&key=${BING_API_KEY}`)
  .then(res => {
    // console.log(res.data.resourceSets[0].resources[0])
    return res.data.resourceSets[0].resources[0]
  }).catch(err => {console.log(err)})
}

const Distance = (lat0, long0, lat1, long1) => {
  return axios(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${lat0},${long0}&destinations=${lat1},${long1}&travelMode=driving&timeUnit=minutes&key=${BING_API_KEY}`)
  .then(res => {
    // console.log(res.data.resourceSets[0].resources[0].results[0])
    return res.data.resourceSets[0].resources[0].results[0]
  }).catch(err => {console.log(err)})
}

const getCoordinatesAndDistance = async(origin, destination) => {
  let orig = await Geocode(origin);
  let dest = await Geocode(destination);

  let distance = await Distance(orig.point.coordinates[0],orig.point.coordinates[1], dest.point.coordinates[0], dest.point.coordinates[1]);

  const results = {
    origin: {
      formattedAddress: orig.address.formattedAddress,
      streetAddress: orig.address.addressLine,
      state: orig.address.adminDistrict,
      city: orig.address.locality,
      zip: orig.address.postalCode
    },
    destination: {
      formattedAddress: dest.address.formattedAddress,
      streetAddress: dest.address.addressLine,
      state: dest.address.adminDistrict,
      city: dest.address.locality,
      zip: dest.address.postalCode
    },
    distance: distance.travelDistance*1000
    // duration: distance.travelDuration*1000
  }
  // console.log(results);
  return results;
}

module.exports = { Geocode, Distance, getCoordinatesAndDistance };
