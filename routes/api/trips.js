const router = require("express").Router();
var models = require('../../models');
const {Trip} = require('../../components');
const tripMod = Trip.Trip;

router
  .route("/")
  .get(function (req, res) {
    tripMod.getTrips()
      .then(trips => {
        return res.json(trips)
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      })
  })

  .post(function (req, res) {
    return tripMod.parseData(req.body)
      .then(trip => {
        return res.json(trip)
      })
      .catch(err => {
        res.status(422).json(err)
      })
  })

router
  .route("/:trip_id")
  .delete(function (req, res) {
    models.Trip.update({
        active: false
      }, {
        where: {
          id: req.params.trip_id
        }
      })
      .then(trip => {
        return res.json(trip)
      })
      .catch(err => res.status(422).json(err))
  })
  .get(function (req, res) {
    models.Trip.findOne({
        where: {
          id: req.params.trip_id
        },
        attributes: ['id', 'createdAt'],
        include: [{
            model: models.Customer,
            attributes: ['id', 'name', 'email', 'address', 'phone']
          },
          {
            model: models.Move,
            attributes: ['id', 'customer_id', 'lane_id', 'trip_id', 'tookan_relationship_id', 'pickup_stop_id', 'delivery_stop_id', 'sequence', 'class', 'pickup_time', 'delivery_time', 'vehicle_year', 'vehicle_stock', 'vehicle_make', 'vehicle_model', 'vehicle_odometer', 'vehicle_image', 'vehicle_vin', 'vehicle_color'],
            include: [{
              model: models.Lane,
              attributes: ['id', 'origin_location_id', 'destination_location_id', 'description', 'duration', 'distance', 'driver_base_pay', 'driver_return_pay', 'driver_pay_per_kilometer', 'average_drive_speed'],
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
            }]
          }
        ]
      }).then(trip => {
        return res.json(trip)
      })
      .catch(err => res.status(422).json(err))
  })
  .put(function (req, res) {
    models.Trip.update(
        req.body, {
          where: {
            id: req.params.trip_id
          }
        })
      .then(trip => {
        return res.json(trip)
      })
      .catch(err => res.status(422).json(err))
  })

module.exports = router;