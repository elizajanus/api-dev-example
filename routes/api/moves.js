const router = require("express").Router();
const move = require("../../controllers/movesController");

router
  .route("/")
  .get(move.findAll)
  .post(move.create);

router
  .route("/:customer_id")
  .get(move.findActiveCustomerEntries)
//this should be done by query parameters

router
  .route("/:move_id")
  .delete(move.makeInactive)
  // .get(move.findOne)
  .put(move.update);  
  //write a findOne method
//patch method -- dynamic -- look into json patch

module.exports = router;