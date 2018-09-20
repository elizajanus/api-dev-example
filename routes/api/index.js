const router = require('express').Router();
const tripRoutes = require('./trips');
const moveRoutes = require('./moves');
const locationRoutes = require('./locations');
const laneRoutes = require('./lanes');
const driverPayRoutes = require('./driverpay');
const invoiceRoutes = require('./invoices');

// routes
router.use('/locations', locationRoutes);
router.use('/moves', moveRoutes);
router.use('/trips', tripRoutes);
router.use('/lanes', laneRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/driver_pay_config', driverPayRoutes);

module.exports = router;