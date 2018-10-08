const router = require("express").Router();
const models = require('../../models');
const {Location} = require('../../components');
const locationMod = Location.Location;

router
  .route("/")
  .get(function (req, res) {
    let query = {}
    if (req.query.id) {
      query["id"] = req.query.id
    }
    locationMod.getLocations(query)
      .then(locations => {
        return res.json(locations)
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      })
  })
  .post(function (req, res) {
    locationMod.createLocation()
      .then(location => {
        return res.json(location)
      })
      .catch(err => {
        console.log(err)
        res.status(422).json(err)
      })
  })

router
  .route("/:location_id")
  .delete(function (req, res) {
    models.Location.update({
        active: false
      }, {
        where: {
          id: req.params.location_id
        }
      })
      .then(location => {
        return res.json(location)
      })
      .catch(err => res.status(422).json(err))
  })
  .get(function (req, res) {
    models.Location.findOne({
        where: {
          id: req.params.location_id
        },
        include: [{
          all: true
        }]
      }).then(location => {
        return res.json(location)
      })
      .catch(err => res.status(422).json(err))
  })
  .put(function (req, res) {
    models.Location.update(
        req.body, {
          where: {
            id: req.params.location_id
          }
        })
      .then(location => {
        return res.json(location)
      })
      .catch(err => res.status(422).json(err))
  })

module.exports = router;