// tripController.js
const { tripModel } = require('../models');

exports = module.exports = {};

/*
// CREATES A NEW TRIP
router.post('/', function (req, res) {
    Trip.create({
            driverLocation: req.body.driverLocation,
            riderLocation: req.body.riderLocation
            // maybe generate a lot of this elsewhere and pass as query parameters..
        },
        function (err, trip) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(trip);
        });
});

// GETS A SINGLE TRIP FROM THE DATABASE
router.get('/:id', function (req, res) {
    Trip.findById(req.params.id, function (err, trip) {
        if (err) return res.status(500).send("There was a problem finding the trip.");
        if (!trip) return res.status(404).send("No trip found.");
        res.status(200).send(trip);
    });
});

// DELETES A TRIP FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Trip.findByIdAndRemove(req.params.id, function (err, trip) {
        if (err) return res.status(500).send("There was a problem deleting the trip.");
        res.status(200).send("Trip was deleted.");
    });
});
*/