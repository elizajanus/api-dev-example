const router = require("express").Router();
var models  = require('../../models');

router
  .route("/")
  .get(function(req,res) {
    models.Move.findAll({
    order:[['createdAt', 'DESC']]
  }).then(moves => {return res.json(moves)})
})
  .post(function(req,res) {
    models.Move.create(req.body).then(move => {return res.json(move)})
    .catch(err => res.status(422).json(err))
  })

router
  .route("/:move_id")
  .delete(function(req,res) {
    models.Move.update( 
      { active: false },
      { where: { id: req.params.move_id } })
      .then(move => {return res.json(move)})
      .catch(err => res.status(422).json(err))
  })
  .get(function(req,res) {
    models.Move.findOne({
     where: { id: req.params.move_id }
  }).then(move => {return res.json(move)})
  .catch(err => res.status(422).json(err))
  })
  .put(function(req,res) {
    models.Move.update( 
    req.body,
    { where: { id: req.params.move_id } })
    .then(move => {return res.json(move)})
    .catch(err => res.status(422).json(err))
  })

module.exports = router;