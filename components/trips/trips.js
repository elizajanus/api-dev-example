const Lane = require('../lanes');
const Location = require('../locations');
const Move = require('../moves');
const Tookan = require('../tookan');
const models  = require('../../models');

const createTrip = (customer) => {
  return models.Trip.create(customer)
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

const adminGetTrips = (query) => {
  return models.Trip.findAll({
    where: query,
   attributes: ['id', 'createdAt', 'updatedAt'],
 include: [
   { model: models.Customer, attributes: ['id', 'name', 'email', 'address', 'phone'] },
   { model: models.Move, as: 'moves', attributes: ['id', 'createdAt','class','pickup_time','delivery_time','tookan_relationship_id', 'pickup_stop_id', 'delivery_stop_id', 'sequence', 'vehicle_year', 'vehicle_stock', 'vehicle_make', 'vehicle_model', 'vehicle_odometer', 'vehicle_image', 'vehicle_vin', 'vehicle_color'], include: [
     { model: models.Lane, as: 'lane', attributes: ['id', 'description', 'distance_miles', 'duration_sec', 'pickup_inspection_sec', 'delivery_inspection_sec', 'return_ride_wait_sec', 'insurance_cost_per_mile', 'insurance_cost', 'estimated_rideshare_return_cost','driver_time_pay', 'driver_drive_pay', 'driver_base_pay_discount', 'driver_base_pay', 'driver_return_pay_discount', 'driver_return_pay', 'tolls', 'driver_rake','driver_pay_per_minute', 'driver_pay_per_kilometer', 'average_drive_speed_min_per_mile', 'average_drive_speed_mph', 'dealer_base_rate', 'dealer_base_rate_type', 'dealer_base_discount', 'dealer_base_price', 'dealer_base_price', 'dealer_stranded_rate', 'dealer_stranded_rate_type', 'dealer_stranded_discount', 'dealer_stranded_price'], include: [
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
    customer_id: data.customer_id
  };
  //in the future, customer_id will be determined by api key in the AWS API Gateway
  const newTrip = await createTrip(tripData);
  data["id"] = newTrip.id;
  console.log(`id: ${newTrip.id}`);
  // for each move:
  // validate times
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
      if (move.lane.hasOwnProperty('id') && move.lane.id !== '' && move.lane.id !== NaN) {
        //this function may be causing errors
        let foundLane = await Lane.Lane.findLaneAndSet(move);
        move.lane.id = foundLane.id;
        move.lane.pickup.address = foundLane.pickup.address;
        move.lane.delivery.address= foundLane.delivery.address;
        move.lane.pickup.name = foundLane.pickup.name;
        move.lane.delivery.name = foundLane.delivery.name;

         //create move in database
         let newMove = {
          sequence: move.sequence,
          customer_id: data.customer_id,
          lane_id: foundLane.id,
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
        
      } else {
        //if null, proceed to check for known locations 
        //validate pickup location
        await Location.Location.validatePickupLocation(move, data.customer_id);
        //validate delivery location 
        await Location.Location.validateDeliveryLocation(move, data.customer_id);
        //find lane by origin_location_id and destination_location_id, create a new lane if not found, if found set lane id

        await (async () => {
          const lane = await Lane.Lane.handleLaneCreation(move.lane.pickup, move.lane.delivery, data.customer_id);
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
          customer_id: data.customer_id,
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

    const trip = await getTripById(data.id);
    console.log(`returning trip ${trip}`)
    return trip;
  }

  await processMoves();
  const result = await determineClassAndSync()
  console.log(`result is ${result}`);
  return result;

}

module.exports = { getTrips, createTrip, getTripById, parseData, adminGetTrips }