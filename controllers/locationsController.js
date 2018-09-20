const db = require("../models");

module.exports = {
  findAll: (res) => {
    db.Location
    .findAll({
      order:[['date', 'DESC']]
    })
      .then(dbLocation => res.json(dbLocation))
      .catch(err => res.status(422).json(err));
  },
  findActiveCustomerEntries: (req, res) => {
    var customer_id = req.params.customer_id;
    db.Location
      .findAll({
        where: {
          customer_id: customer_id,
          active: true
        },
        order:[['date', 'DESC']]
      })
      .then(dbLocation=> res.json(dbLocation))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    db.Location
      .create(req.body)
      .then(dbLocation => res.json(dbLocation))
      .catch(err => res.status(422).json(err));
  },
  makeInactive: (req, res) => {
    db.Location
      .update(
        { active: false},
        { where: { id: req.params.location_id } })
      .then(dbLocation => res.json(dbLocation))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.Location
    .update(
      req.body,
      { where: { id: req.params.location_id } })
      .then(dbLocation => res.json(dbLocation))
      .catch(err => res.status(422).json(err));
  }
};