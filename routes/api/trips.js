const router = require("express").Router();
const db = require("../../models");
const trip = require("../../controllers/tripsController");

router
  .route("/")
  .get(trip.findAll)
  .post(trip.create);

router
  .route("/:customer_id")
  .get(trip.findActiveCustomerEntries)

router
  .route("/:trip_id")
  .delete(trip.makeInactive)
  // .get(trip.findOne)
  .put(trip.update);

module.exports = router;