var models = require('../../models');

const createMove = (move) => {
  return models.Move.create(move)
}

const getMoves = (query) => {
  return models.Move.findAll({
    where: query,
    include: [{
      all: true
    }],
    order: [
      ['createdAt', 'DESC']
    ]
  })
}

const getMoveById = (id) => {
  return models.Move.findOne({
    where: {
      id: id
    },
    include: [{
      all: true
    }]
  })
}

const updateTookanIds = (id, job_token, pickup_stop_id, delivery_stop_id) => {
  return models.Move.update({
    tookan_relationship_id: job_token,
    pickup_stop_id: pickup_stop_id,
    delivery_stop_id: delivery_stop_id
  }, {
    where: {
      id: id
    }
  })
}

const updateMoveClass = (id, move_class) => {
  return models.Move.update({
    class: move_class
  }, {
    where: {
      id: id
    }
  })
}

const validateTime = (data) => {
  //this will be exanded upon in the future
  data.moves.forEach((move, index) => {
    if (move.lane.pickup.time === null || move.lane.pickup.time === undefined) {
      console.log(`error: no time specified at ${move.lane.pickup}`)
    } else if (move.lane.delivery.time === null || move.lane.delivery.time === undefined) {
      console.log(`error: no time specified at ${move.lane.delivery}`)
    } else {
      console.log(`times for move ${index +1} are valid`)
    }
  })
}

const sortMoves = (data) => {
  return data.moves.sort(function (move, nextmove) {
    return move.sequence - nextmove.sequence;
  });
}

const determineMoveClass = (move, index, moves) => {
  let nextPickupIndex = moves[index + 1] === undefined ? 0 : index + 1;
  move["class"] = move.lane.delivery.id === moves[nextPickupIndex].lane.pickup.id ? "base" : "stranded";
  console.log(`class for move ${index} is ${move.class}`)
}


module.exports = {
  createMove,
  validateTime,
  determineMoveClass,
  getMoveById,
  updateTookanIds,
  getMoves,
  sortMoves,
  updateMoveClass
};