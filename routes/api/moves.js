const router = require("express").Router();
var models  = require('../../models');
const { Move } = require('../../components');
const moveMod = Move.Move;

router
  .route("/")
  .get(function(req,res) {
    let query = {}
    if (req.query.id) {
      query["id"] = req.query.id
    }
    moveMod.getMoves(query)
    .then(moves => {
      return res.json(moves)})
    .catch(err => 
      {console.log(err)
      res.status(422).json(err)})
  })
  // .post(function(req,res) {
  //   models.Move.create(req.body).then(move => {return res.json(move)})
  //   .catch(err => res.status(422).json(err))
  // })

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
     where: { id: req.params.move_id },
     include: [
      { all: true }
   ]
  }).then(move => {return res.json(move)})
  .catch(err => res.status(422).json(err))
  })
  // .put(function(req,res) {
  //   models.Move.update( 
  //   req.body,
  //   { where: { id: req.params.move_id } })
  //   .then(move => {return res.json(move)})
  //   .catch(err => res.status(422).json(err))
  // })
  .put(function(req,res) {
    models.Move.update( 
    { 
     tookan_relationship_id: req.body.job_token, 
     pickup_stop_id: req.body.pickup_stop_id, 
     delivery_stop_id: req.body.delivery_stop_id
    },
    { where: { id: req.params.move_id } })
    .then(move => {return res.json(move)})
    .catch(err => res.status(422).json(err))
  })

module.exports = router;