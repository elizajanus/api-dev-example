const router = require("express").Router();
var models = require('../../models');
const {Lane} = require('../../components');
const laneMod = Lane.Lane;

router
  .route("/")
  .get(function (req, res) {
    let query = {}
    if (req.query.address) {
      query["description"] = {
        $like: `${req.query.description}%`
      }
    }
    if (req.query.id) {
      query["id"] = req.query.id
    }
    laneMod.getLanes(query)
      .then(lanes => {
        return res.json(lanes)
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      })
  })
// .post(laneMod.createLane(req, res))

router
  .route("/:lane_id")
  .delete(function (req, res) {
    models.Lane.update({
        active: false
      }, {
        where: {
          id: req.params.lane_id
        }
      })
      .then(lane => {
        return res.json(lane)
      })
      .catch(err => res.status(422).json(err))
  })
  .get(function (req, res) {
    models.Lane.findOne({
        where: {
          id: req.params.lane_id
        },
        include: [{
            model: models.Location,
            as: 'pickup',
            attributes: ['id', 'tookan_id', 'name', 'address', 'email', 'phone']
          },
          {
            model: models.Location,
            as: 'delivery',
            attributes: ['id', 'tookan_id', 'name', 'address', 'email', 'phone']
          }
        ]
      }).then(lane => {
        return res.json(lane)
      })
      .catch(err => res.status(422).json(err))
  })
  .put(function (req, res) {
    models.Lane.update(
        req.body, {
          where: {
            id: req.params.lane_id
          }
        })
      .then(lane => {
        return res.json(lane)
      })
      .catch(err => res.status(422).json(err))
  })

router
  .route("/:location_1/:location_2")
  .get(function (req, res) {
    models.Lane.findOne({
        where: {
          origin_location_id: req.params.location_1,
          destination_location_id: req.params.location_2
        },
        include: [{
            model: models.Location,
            as: 'pickup',
            attributes: ['id', 'tookan_id', 'name', 'address', 'email', 'phone']
          },
          {
            model: models.Location,
            as: 'delivery',
            attributes: ['id', 'tookan_id', 'name', 'address', 'email', 'phone']
          }
        ]
      }).then(lane => {
        return res.json(lane)
      })
      .catch(err => res.status(422).json(err))
  })

module.exports = router;