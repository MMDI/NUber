/* api.js*/
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const {
    driverID,
    setAvailability,
    viewAssignment,
    addDriver,
    removeDriver
} = require('../controllers/driverController');

const {
    riderID,
    searchDrivers,
    scheduleTrip,
    addRider,
    removeRider
} = require('../controllers/riderController');

const {
    tripID
} = require('../controllers/tripController');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* Parameters*/
router.param('driverID', driverID);
router.param('riderID', riderID);
router.param('tripID', tripID);

/* Driver routes*/
router.put('/driver/:driverID/setAvailability', setAvailability);
router.get('/driver/:driverID/viewAssignment', viewAssignment);
router.post('/driver', addDriver);
router.delete('/driver/:driverID', removeDriver);

/* Rider routes*/
router.post('/rider/:riderID/scheduleTrip', scheduleTrip);
router.get('/rider/:riderID/searchDrivers', searchDrivers);
router.post('/rider', addRider);
router.delete('/rider/:riderID', removeRider);

/* Bad route*/
router.use('/', (req, res) => res.sendStatus(404));

module.exports = router;