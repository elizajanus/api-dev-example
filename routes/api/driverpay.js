const router = require("express").Router();
const pay = require("../../controllers/driverpayController");

router
  .route("/")
  .get(pay.findAll)
  .post(pay.create);

router
  .route("/:customer_id")
  .get(pay.findActiveCustomerEntries)

router
  .route("/:pay_id")
  .delete(pay.makeInactive)
  // .get(pay.findOne)
  .put(pay.update); 

module.exports = router;