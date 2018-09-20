const db = require("../models");

module.exports = {
  findAll: (res) => {
    db.DriverPay
    .findAll({
      order:[['date', 'DESC']]
    })
      .then(dbDriverPay => res.json(dbDriverPay))
      .catch(err => res.status(422).json(err));
  },
  findActiveCustomerEntries: (req, res) => {
    var customer_id = req.params.customer_id;
    db.DriverPay
      .findAll({
        where: {
          customer_id: customer_id,
          active: true
        },
        order:[['date', 'DESC']]
      })
      .then(dbDriverPay => res.json(dbDriverPay))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    db.DriverPay
      .create(req.body)
      .then(dbDriverPay => res.json(dbDriverPay))
      .catch(err => res.status(422).json(err));
  },
  makeInactive: (req, res) => {
    db.DriverPay
      .update(
        { active: false},
        { where: { id: req.params.pay_id } })
      .then(dbDriverPay => res.json(dbDriverPay))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.DriverPay
    .update(
      req.body,
      { where: { id: req.params.pay_id } })
      .then(dbDriverPay => res.json(dbDriverPay))
      .catch(err => res.status(422).json(err));
  }
};