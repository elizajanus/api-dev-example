const router = require("express").Router();
var models  = require('../../models');

router
  .route("/")
  .get(function(req,res) {
    models.Trip.findAll({
    order:[['createdAt', 'DESC']]
  }).then(trips => {return res.json(trips)})
  .catch(err => res.status(422).json(err))
})
  .post(function(req,res) {
    models.Trip.create(req.body).then(trip => {return res.json(trip)})
    .catch(err => res.status(422).json(err))
  })
  
router
  .route("/:trip_id")
  .delete(function(req,res) {
    models.Trip.update( 
      { active: false },
      { where: { id: req.params.trip_id } })
      .then(trip => {return res.json(trip)})
      .catch(err => res.status(422).json(err))
})
  .get(function(req,res) {
    models.Trip.findOne({
     where: { id: req.params.trip_id }
  }).then(trip => {return res.json(trip)})
  .catch(err => res.status(422).json(err))
})
  .put(function(req,res) {
    models.Trip.update( 
    req.body,
    { where: { id: req.params.trip_id } })
    .then(trip => {return res.json(trip)})
    .catch(err => res.status(422).json(err))
  })

module.exports = router;