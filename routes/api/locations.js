const router = require("express").Router();
var models  = require('../../models');

router
  .route("/")
  .get(function(req,res) {
    models.Location.findAll({
    order:[['createdAt', 'DESC']]
  }).then(location => {return res.json(location)})
})
  .post(function(req,res) {
    models.Location.create(req.body).then(location => {return res.json(location)})
    .catch(err => res.status(422).json(err))
  })

router
  .route("/:location_id")
  .delete(function(req,res) {
    models.Location.update( 
      { active: false },
      { where: { id: req.params.location_id } })
      .then(location => {return res.json(location)})
      .catch(err => res.status(422).json(err))
  })
  .get(function(req,res) {
    models.Location.findOne({
     where: { id: req.params.location_id }
  }).then(location => {return res.json(location)})
  .catch(err => res.status(422).json(err))
  })
  .put(function(req,res) {
    models.Location.update( 
    req.body,
    { where: { id: req.params.location_id } })
    .then(location => {return res.json(location)})
    .catch(err => res.status(422).json(err))
  })

module.exports = router;