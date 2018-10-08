const router = require("express").Router();
var models = require('../../models');

router
  .route("/")
  .get(function (req, res) {
    models.RateOutput.findAll({
      include: [{
        all: true
      }],
      order: [
        ['createdAt', 'DESC']
      ]
    }).then(invoices => {
      return res.json(invoices)
    })
  })
  .post(function (req, res) {
    models.RateOutput.create(req.body).then(invoice => {
        return res.json(invoice)
      })
      .catch(err => res.status(422).json(err))
  })

router
  .route("/:output_id")
  .delete(function (req, res) {
    models.RateOutput.update({
        active: false
      }, {
        where: {
          id: req.params.output_id
        }
      })
      .then(invoice => {
        return res.json(invoice)
      })
      .catch(err => res.status(422).json(err))
  })
  .get(function (req, res) {
    models.RateOutput.findOne({
        where: {
          id: req.params.output_id
        },
        include: [{
          all: true
        }]
      }).then(invoice => {
        return res.json(invoice)
      })
      .catch(err => res.status(422).json(err))
  })
  .put(function (req, res) {
    models.RateOutput.update(
        req.body, {
          where: {
            id: req.params.output_id
          }
        })
      .then(invoice => {
        return res.json(invoice)
      })
      .catch(err => res.status(422).json(err))
  })

module.exports = router;