const models  = require('../../models');

const createLane = (lane) => {
  return models.Lane.create(
    lane,
    {include: [
      { model: models.Location, as: 'pickup', attributes: ['id', 'tookan_id', 'name', 'address', 'email', 'phone'] },
      { model: models.Location, as: 'delivery', attributes: ['id', 'tookan_id', 'name', 'address', 'email', 'phone'] }
   ]}
    )
}

const getLanes = (query) => {
   return models.Lane.findAll({
      where: query,
      include: [
        { model: models.Location, as: 'pickup', attributes: ['id', 'tookan_id', 'name', 'address', 'email', 'phone'] },
        { model: models.Location, as: 'delivery', attributes: ['id', 'tookan_id', 'name', 'address', 'email', 'phone'] }
     ],
    order:[['createdAt', 'DESC']]
  })
}

const getLaneById = (id) => {
  return models.Lane.findOne({
    where: {id: id},
    include: [
     { all: true }
  ]
 })
}
const getLaneByLocations = (pickup_id, delivery_id) => {
  return models.Lane.findOne({
    where: { origin_location_id: pickup_id,
             destination_location_id: delivery_id },
    include: [
    { model: models.Location, as: 'pickup', attributes: ['id', 'tookan_id', 'name', 'address', 'email', 'phone'] },
    { model: models.Location, as: 'delivery', attributes: ['id', 'tookan_id', 'name', 'address', 'email', 'phone'] }
    ]         
  })
}

const handleLaneCreation = async(pickup, delivery, customer_id) => {
  let lane = await getLaneByLocations(pickup.id, delivery.id);
  if (lane === null || lane === undefined || lane.length === 0) {
        let newLane = {
          customer_id: customer_id,
          description: `${pickup.name} to ${delivery.name}`, //name of first location + to + name of second location
          origin_location_id: pickup.id,
          destination_location_id: delivery.id
        };
       lane = await createLane(newLane);
       console.log(`new lane created with id ${lane.id}`)
    }
    let reverseLane = await getLaneByLocations(delivery.id, pickup.id);
    if (reverseLane === null || reverseLane === undefined || reverseLane.length === 0) {
        newReverseLane = {
          customer_id: customer_id,
          description: `${delivery.name} to ${pickup.name}`, //name of first location + to + name of second location
          origin_location_id: delivery.id,
          destination_location_id: pickup.id
        };
       reverseLane = await createLane(newReverseLane);
       console.log(`new lane created with id ${reverseLane.id}`)
  }
  return lane;
}

const findLaneAndSet = async(move) => {
  let foundLane = await getLaneById(move.lane.id);
  //update to reflect new data structure
  if(foundLane === null || foundLane === undefined || foundLane.length === 0) {
    console.log(`error: invalid lane id at move sequence ${move.sequence}. please retry your move request.`)
  } else {
    console.log(`lane found: ${foundLane.id}`)
    return foundLane;
  }
}

  module.exports = { getLanes, createLane, getLaneById, getLaneByLocations, handleLaneCreation, findLaneAndSet };