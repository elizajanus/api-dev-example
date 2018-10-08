const Lane = require('../lanes');
const Location = require('../locations');
const Move = require('../moves');
const Tookan = require('../tookan');
const models  = require('../../models');
// const mixLocationsBackForth = require('./mixLocationsBackForth');

const createTrip = (location) => {
  return models.Trip.create(location)
}

//TODO: make separate Vehicle table to be referenced in trip objects
const getTrips = () => {
    return models.Trip.findAll({
    attributes: ['id', 'createdAt', 'updatedAt'],
    include: [
      { model: models.Customer, attributes: ['id', 'name', 'email', 'address', 'phone'] },
      { model: models.Move, as: 'moves', attributes: ['id', 'class','pickup_time','delivery_time', 'sequence', 'vehicle_year', 'vehicle_stock', 'vehicle_make', 'vehicle_model', 'vehicle_odometer', 'vehicle_image', 'vehicle_vin', 'vehicle_color'], include: [
        { model: models.Lane, as: 'lane', attributes: ['id', 'description'], include: [
          { model: models.Location, as: 'pickup', attributes: ['id', 'name', 'address', 'email', 'phone'] },
          { model: models.Location, as: 'delivery', attributes: ['id', 'name', 'address', 'email', 'phone'] }
        ] }
      ] }
   ],
  order:[['createdAt', 'DESC']]
})
}
 
  const getTripById = (id) => {
    return models.Trip.findOne({
      where: { id: id },
      attributes: ['id', 'createdAt', 'updatedAt'],
    include: [
      { model: models.Customer, attributes: ['id', 'name', 'email', 'address', 'phone'] },
      { model: models.Move, as: 'moves', attributes: ['id', 'class','pickup_time','delivery_time','sequence', 'vehicle_year', 'vehicle_stock', 'vehicle_make', 'vehicle_model', 'vehicle_odometer', 'vehicle_image', 'vehicle_vin', 'vehicle_color'], include: [
        { model: models.Lane, as: 'lane', attributes: ['id', 'description'], include: [
          { model: models.Location, as: 'pickup', attributes: ['id', 'name', 'address', 'email', 'phone'] },
          { model: models.Location, as: 'delivery', attributes: ['id', 'name', 'address', 'email', 'phone'] }
        ] }
      ] }
   ],
   order:[['createdAt', 'DESC']]
   })
  }

const parseData = async (data) => {
  //create trip, then add a trip id property to the data set
  let tripData = {
    customer_id: 1
  };
  //in the future, customer_id will be determined by api key
  const newTrip = await createTrip(tripData);
  data["id"] = newTrip.id;
  console.log(`id: ${newTrip.id}`);
  //  // for each move:
  //  // validate times
  await Move.Move.validateTime(data);

  //sort moves by sequence
  const sortedMoves = await Move.Move.sortMoves(data);
  data["moves"] = sortedMoves;

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }
  const processMoves = async () => {
    await asyncForEach(data.moves, async (move, index, moves) => {
      //need function to determine if field exists
      if (move.lane.hasOwnProperty('id')) {
        let foundLane = await Lane.Lane.findLaneAndSet(move);
        move.lane.id = foundLane.id;
      } else {
        //if null, proceed to check for known locations 
        //validate pickup location
        await Location.Location.validatePickupLocation(move);
        //validate delivery location 
        await Location.Location.validateDeliveryLocation(move);
        //find lane by origin_location_id and destination_location_id, create a new lane if not found, if found set lane id

        await (async () => {
          const lane = await Lane.Lane.handleLaneCreation(move.lane.pickup, move.lane.delivery, 1);
          if (lane !== null || lane !== undefined || lane.length !== 0) {
            move.lane.id = lane.id;
            console.log(`lane ${lane.id} found and added to move object`)
          } else {
            console.log("lane creation unsuccessful")
          }
        })();

        //create move in database
        let newMove = {
          sequence: move.sequence,
          customer_id: 1,
          lane_id: move.lane.id,
          trip_id: data.id,
          pickup_time: move.lane.pickup.time,
          delivery_time: move.lane.delivery.time,
          vehicle_year: move.vehicle.year,
          vehicle_make: move.vehicle.make,
          vehicle_model: move.vehicle.model,
          vehicle_color: move.vehicle.color,
          vehicle_stock: move.vehicle.stockNumber,
          vehicle_vin: move.vehicle.vin,
          vehicle_image: move.vehicle.image,
          vehicle_odometer: move.vehicle.odometer
        }
        const aNewMove = await Move.Move.createMove(newMove);
        console.log(`new move created with id: ${aNewMove.id}`);
        move["id"] = aNewMove.id;
      };
    })
  }

  const determineClassAndSync = async () => {

    await asyncForEach(data.moves, async (move, index, moves) => {
      //determine move classes and move record
      await Move.Move.determineMoveClass(move, index, moves);
      await Move.Move.updateMoveClass(move.id, move.class);
    })

    await asyncForEach(data.moves, (move, index, moves) => {
      //Sync with Tookan: 
      //1. use move data to create moves in tookan
      //2. extract tookan relationship id for each move and add to move record

      Tookan.Tookan.createTookanMove(move, function (res) {
        //sync tookan_relationship_id in move record
        Move.Move.updateTookanIds(move.id, res.data.data.pickups[0].job_token, res.data.data.pickups[0].job_id, res.data.data.deliveries[0].job_id)
      })
    })

    const trip = getTripById(data.id);
    console.log(`returning trip ${trip}`)
    return trip;
  }

  await processMoves();
  const result = await determineClassAndSync()
  console.log(`result is ${result}`);
  return result;

}


module.exports = { getTrips, createTrip, getTripById, parseData }