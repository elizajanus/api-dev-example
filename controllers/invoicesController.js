const db = require("../models");

module.exports = {
  findAll: (res) => {
    db.RateOutput
    .findAll({
      order:[['date', 'DESC']]
    })
      .then(dbRateOutput => res.json(dbRateOutput))
      .catch(err => res.status(422).json(err));
  },
  findActiveCustomerEntries: (req, res) => {
    var customer_id = req.params.customer_id;
    db.RateOutput
      .findAll({
        where: {
          customer_id: customer_id,
          active: true
        },
        order:[['date', 'DESC']]
      })
      .then(dbRateOutput => res.json(dbRateOutput))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    db.RateOutput
      .create(req.body)
      .then(dbRateOutput => res.json(dbRateOutput))
      .catch(err => res.status(422).json(err));
  },
  makeInactive: (req, res) => {
    db.RateOutput
      .update(
        { active: false},
        { where: { id: req.params.output_id } })
      .then(dbRateOutput => res.json(dbRateOutput))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.RateOutput
    .update(
      req.body,
      { where: { id: req.params.output_id } })
      .then(dbRateOutput => res.json(dbRateOutput))
      .catch(err => res.status(422).json(err));
  }
};