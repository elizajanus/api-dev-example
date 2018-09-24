const router = require("express").Router();
var models  = require('../../models');

router
  .route("/")
  .get(function(req,res) {
    models.Lane.findAll({
    order:[['createdAt', 'DESC']]
  }).then(lanes => {return res.json(lanes)})
})
  .post(function(req,res) {
    models.Lane.create(req.body).then(lane => {return res.json(lane)})
    .catch(err => res.status(422).json(err))
  })

router
  .route("/:lane_id")
  .delete(function(req,res) {
    models.Lane.update( 
      { active: false },
      { where: { id: req.params.lane_id } })
      .then(lane => {return res.json(lane)})
      .catch(err => res.status(422).json(err))
  })
  .get(function(req,res) {
    models.Lane.findOne({
     where: { id: req.params.lane_id }
  }).then(lane => {return res.json(lane)})
  .catch(err => res.status(422).json(err))
  })
  .put(function(req,res) {
    models.Lane.update( 
    req.body,
    { where: { id: req.params.lane_id } })
    .then(lane => {return res.json(lane)})
    .catch(err => res.status(422).json(err))
  })

module.exports = router;