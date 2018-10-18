const models = require('../../models');

const createLocation = (location) => {
  return models.Location.create(location)
}

const getLocations = (query) => {
  return models.Location.findAll({
    where: query,
    include: [{
      all: true
    }],
    order: [
      ['createdAt', 'DESC']
    ]
  })
}
const getLocationById = (id) => {
  return models.Location.findOne({
    where: {
      id: id
    },
    include: [{
      all: true
    }]
  })
}
const getLocationByAddress = (address) => {
  return models.Location.findOne({
    where: {
      address: address
    },
    include: [{
      all: true
    }]
  })
}

const validatePickupLocation = async (move, customer_id) => {
  if (move.lane.pickup.hasOwnProperty('id') && move.lane.pickup.id !== '') {
    let foundLocation = await getLocationById(move.lane.pickup.id);
    if (foundLocation === null || foundLocation === undefined || foundLocation.length === 0) {
      console.log(`error: invalid location id at location ${move.pickup.address}. please retry your move request.`)
    } else {
      move.lane.pickup.address = foundLocation.address;
      move.lane.pickup.id = foundLocation.id
      console.log(`location found. location added to local object: ${foundLocation.id}`);
    }
  } else {
    if (move.lane.pickup.address === null || move.lane.pickup.address === undefined) {
      console.log(`error: invalid address at location ${move.lane.pickup.id}. please retry your move request.`)
    } else {
      //get location by address
      await getLocationByAddress(move.lane.pickup.address) //return a promise
        .then(async (res) => {
          if (res === null || res === undefined || res.length === 0) {
            //if no location found then create location record and set move.pickup.id
            //TODO: change to match data i.e. search by address1 and zip
            // let loc = await Geocode.Geocode.Geocode(move.lane.pickup.address);
            let location = {
              customer_id: customer_id,
              name: move.lane.pickup.address,
              // address: loc.address.formattedAddress,
              address: move.lane.pickup.address,
              email: move.lane.pickup.email,
              phone: move.lane.pickup.phone
            };
            let newLocation = await createLocation(location);
            move.lane.pickup.address = newLocation.address;
            move.lane.pickup.id = newLocation.id;
            move.lane.pickup.name = newLocation.address;
            console.log(`new location with id ${newLocation.id} created.`);
          } else {
            move.lane.pickup.address = res.address;
            move.lane.pickup.id = res.id;
            console.log(`location found. location added to local object: ${res.id}`);
          }
        });
    }
  };
}


const validateDeliveryLocation = async (move, customer_id) => {
  if (move.lane.delivery.hasOwnProperty('id') && move.lane.delivery.id !== '') {
    let foundLocation = await getLocationById(move.lane.delivery.id);
    if (foundLocation === null || foundLocation === undefined || foundLocation.length === 0) {
      console.log(`error: invalid location id at location ${move.delivery.address}. please retry your move request.`)
    } else {
      move.lane.delivery.address = foundLocation.address;
      move.lane.delivery.id = foundLocation.id;
      console.log(`location found. location added to local object: ${foundLocation.id}`);
    }
  } else {
    if (move.lane.delivery.address === null || move.lane.delivery.address === undefined) {
      console.log(`error: invalid address at location ${move.lane.delivery.id}. please retry your move request.`)
    } else {
      //get location by address
      await getLocationByAddress(move.lane.delivery.address) //return a promise
        .then(async (res) => {
          if (res === null || res === undefined || res.length === 0) {
            //if no location found then create location record and set move.pickup.id
            //TODO: change to match data i.e. search by address1 and zip
            // let loc = await Geocode.Geocode.Geocode(move.lane.delivery.address);
            let location = {
              customer_id: customer_id,
              name: move.lane.delivery.address,
              // address: loc.address.formattedAddress,
              address: move.lane.delivery.address,
              email: move.lane.delivery.email,
              phone: move.lane.delivery.phone
            };
            let newLocation = await createLocation(location);
            move.lane.delivery.address = newLocation.address;
            move.lane.delivery.id = newLocation.id;
            move.lane.delivery.name = newLocation.name;
            console.log(`new location with id ${newLocation.id} created.`);
          } else {
            move.lane.delivery.address = res.address;
            move.lane.delivery.id = res.id;
            console.log(`location found. location added to local object: ${res.id}`);
          }
        });
    }
  };
}

module.exports = {
  getLocationById,
  getLocationByAddress,
  createLocation,
  getLocations,
  validateDeliveryLocation,
  validatePickupLocation
};