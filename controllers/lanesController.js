const db = require("../models");

module.exports = {
  findAll: (res) => {
    db.Lane
    .findAll({
      order:[['date', 'DESC']]
    })
      .then(dbLane => res.json(dbLane))
      .catch(err => res.status(422).json(err));
  },
  findActiveCustomerEntries: function(req, res) {
    var customer_id = req.params.customer_id;
    db.Lane
      .findAll({
        where: {
          customer_id: customer_id,
          active: true
        },
        order:[['date', 'DESC']]
      })
      .then(dbLane => res.json(dbLane))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    db.Lane
      .create(req.body)
      .then(dbLane => res.json(dbLane))
      .catch(err => res.status(422).json(err));
  },
  makeInactive: (req, res) => {
    db.Lane
      .update(
        { active: false},
        { where: { id: req.params.lane_id } })
      .then(dbLane => res.json(dbLane))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.Lane
    .update(
      req.body,
      { where: { id: req.params.lane_id } })
      .then(dbLane => res.json(dbLane))
      .catch(err => res.status(422).json(err));
  }
};