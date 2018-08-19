// riderController.js
const { riderModel, driverModel, tripModel } = require('../models');
const { getDirections, getSteps } = require('../utils/tools');

exports = module.exports = {};

/*
// CREATES A NEW RIDER
router.post('/', function (req, res) {
    Rider.create({
            location: req.body.location
        },
        function (err, rider) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(rider);
        });
});

// RETURNS ALL THE RIDERS IN THE DATABASE
router.get('/', function (req, res) {
    Rider.find({}, function (err, riders) {
        if (err) return res.status(500).send("There was a problem finding the riders.");
        res.status(200).send(riders);
    });
});

// UPDATES A SINGLE RIDER IN THE DATABASE
router.put('/:id', function (req, res) {

    Rider.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, rider) {
        if (err) return res.status(500).send("There was a problem updating the rider.");
        res.status(200).send(rider);
    });
});

// DELETES A RIDER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Rider.findByIdAndRemove(req.params.id, function (err, rider) {
        if (err) return res.status(500).send("There was a problem deleting the rider.");
        res.status(200).send("Rider was deleted.");
    });
});
*/

// scheduleTrip
exports.scheduleTrip = async (req, res) => {
    const assignedDriver = await driverModel.findById(req.body.driverID);

    const tripDirections = await getDirections(
        assignedDriver.location, req.rider.location, req.body.dropoff
    );

    const tripSchedule = new tripModel({
        riderID: req.rider._id,
        driverID: assignedDriver._id,
        driverLocation: {
            address: tripDirections.routes[0].legs[0].start_address,
            latitude: assignedDriver.location.latitude,
            longitude: assignedDriver.location.longitude
        },
        pickUpLocation: {
            address: tripDirections.routes[0].legs[0].end_address,
            latitude: req.rider.location.latitude,
            longitude: req.rider.location.longitude
        },
        dropOffLocation: {
            address: tripDirections.routes[0].legs[1].end_address,
            latitude: req.body.dropoff.latitude,
            longitude: req.body.dropoff.longitude
        },
        distance: tripDirections.routes[0].legs[1].distance.text,
        timeToPickup: tripDirections.routes[0].legs[0].duration.text,
        timeToDropOff: tripDirections.routes[0].legs[1].duration.text,
        directionsToPickup: getSteps(tripDirections.routes[0].legs[0].steps),
        directionsToDropOff: getSteps(tripDirections.routes[0].legs[1].steps)
    });
    const tripRecord = await tripSchedule.save();
    res.send(tripRecord);
}