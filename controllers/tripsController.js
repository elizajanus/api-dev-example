const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.Trip
      .findAll({
        order:[['date', 'DESC']]
      })
      .then(dbTrip => res.json(dbTrip))
      .catch(err => res.status(422).json(err));
  },
  findActiveCustomerEntries: (req, res) => {
    var customer_id = req.params.customer_id;
    db.Trip
      .findAll({
        where: {
          customer_id: customer_id,
          active: true
        },
        order:[['date', 'DESC']]
      })
      .then(dbTrip => res.json(dbTrip))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    db.Trip
      .create(req.body)
      .then(dbTrip => res.json(dbTrip))
      .catch(err => res.status(422).json(err));
  },
  makeInactive: (req, res) => {
    db.Trip
      .update(
        { active: false },
        { where: { id: req.params.trip_id } })
      .then(dbTrip => res.json(dbTrip))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.Trip
    .update(
      req.body,
      { where: { id: req.params.trip_id } })
      .then(dbTrip => res.json(dbTrip))
      .catch(err => res.status(422).json(err));
  }
}