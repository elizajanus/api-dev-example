const router = require("express").Router();
const location = require("../../controllers/locationsController");

router
  .route("/")
  .get(location.findAll)
  .post(location.create);

router
  .route("/:customer_id")
  .get(location.findActiveCustomerEntries)

router
  .route("/:location_id")
  .delete(location.makeInactive)
  // .get(location.findOne)
  .put(location.update); 

module.exports = router;