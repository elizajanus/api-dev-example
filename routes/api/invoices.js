const router = require("express").Router();
const invoice = require("../../controllers/invoicesController");

router
  .route("/")
  .get(invoice.findAll)
  .post(invoice.create);

router
  .route("/:customer_id")
  .get(invoice.findActiveCustomerEntries);

router
  .route("/:output_id")
  .delete(invoice.makeInactive)
  // .get(invoice.findOne)
  .put(invoice.update);

module.exports = router;