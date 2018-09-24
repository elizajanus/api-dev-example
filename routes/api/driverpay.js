const router = require("express").Router();
var models  = require('../../models');

router
  .route("/")
  .get(function(req,res) {
    models.DriverPay.findAll({
    order:[['createdAt', 'DESC']]
  }).then(pay => {return res.json(pay)})
  })
  .post(function(req,res) {
    models.DriverPay.create(req.body).then(pay => {return res.json(pay)})
    .catch(err => res.status(422).json(err))
  })

router
  .route("/:pay_id")
  .delete(function(req,res) {
    models.DriverPay.update( 
      { active: false },
      { where: { id: req.params.pay_id } })
      .then(pay => {return res.json(pay)})
      .catch(err => res.status(422).json(err))
  })
  .get(function(req,res) {
    models.DriverPay.findOne({
     where: { id: req.params.pay_id }
  }).then(pay => {return res.json(pay)})
  .catch(err => res.status(422).json(err))
  })
  .put(function(req,res) {
    models.DriverPay.update( 
    req.body,
    { where: { id: req.params.pay_id } })
    .then(pay => {return res.json(pay)})
    .catch(err => res.status(422).json(err))
  })

module.exports = router;