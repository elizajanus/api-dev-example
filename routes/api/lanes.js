const router = require("express").Router();
const lane = require("../../controllers/lanesController");

router
  .route("/")
  .get(lane.findAll)
  .post(lane.create);

router
  .route("/:customer_id")
  .get(lane.findActiveCustomerEntries)

router
  .route("/:lane_id")
  .delete(lane.makeInactive)
  // .get(lane.findOne)
  .put(lane.update); 

module.exports = router;