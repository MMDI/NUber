// api.js
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const {
    // driver functions
    setAvailability,
    viewAssignment,
    addDriver,
    removeDriver
} = require('../controllers/driverController');

const {
    // rider functions
    searchDrivers,
    scheduleTrip
} = require('../controllers/riderController');

/*
const {
    // trip functions

} = require('../controllers/tripController');
*/

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Param Defs
router.param('driverID', driverID);
router.param('riderID', riderID);
router.param('tripID', tripID);

// Driver routes
router.put('/driver/:driverID/setAvailability', setAvailability);
router.get('/driver/:driverID/viewAssignment', viewAssignment);
router.post('/driver', addDriver);
router.delete('/driver/:driverID', removeDriver);

// Rider routes
router.post('/rider/:riderID/scheduleTrip', scheduleTrip);
router.get('/rider/:riderID/searchDrivers', searchDrivers);

// Trip routes


// Bad route
router.use('/', (req, res) => res.sendStatus(404));

module.exports = router;