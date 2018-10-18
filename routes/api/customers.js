const router = require("express").Router();
const models = require('../../models');


router
  .route("/")
  .get(function (req, res) {
    models.Customer.findAll({
      include: [{
        all: true
      }],
      order: [
        ['createdAt', 'DESC']
      ]
    }).then(customers => {
      return res.json(customers)
    })
  })

module.exports = router;

