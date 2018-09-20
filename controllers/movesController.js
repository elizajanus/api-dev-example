const db = require("../models");

module.exports = {
  findAll: (res) => {
    db.Move
    .findAll({
      order:[['date', 'DESC']]
    })
      .then(dbMove => res.json(dbMove))
      .catch(err => res.status(422).json(err));
  },
  findActiveCustomerEntries: (req, res) => {
    var customer_id = req.params.customer_id;
    db.Move
      .findAll({
        where: {
          customer_id: customer_id,
          active: true
        },
        order:[['date', 'DESC']]
      })
      .then(dbMove => res.json(dbMove))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    db.Move
      .create(req.body)
      .then(dbMove => res.json(dbMove))
      .catch(err => res.status(422).json(err));
  },
  makeInactive: (req, res) => {
    db.Move
      .update(
        { active: false },
        { where: { id: req.params.move_id } })
      .then(dbMove => res.json(dbMove))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.Move
    .update(
      req.body,
      { where: { id: req.params.move_id } })
      .then(dbMove => res.json(dbMove))
      .catch(err => res.status(422).json(err));
  }
};