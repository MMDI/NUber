// driverController.js
const { driverModel, riderModel, tripModel } = require('../models');

exports = module.exports = {};
/*
// CREATES A NEW DRIVER
// need to add admin auth
router.post('/', function (req, res) {
    Driver.create({
            available: req.body.available,
            location: req.body.location
        },
        function (err, driver) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(driver);
        });
});

// RETURNS ALL THE DRIVERS IN THE DATABASE
router.get('/', function (req, res) {
    Driver.find({}, function (err, drivers) {
        if (err) return res.status(500).send("There was a problem finding the drivers.");
        res.status(200).send(drivers);
    });
});

// UPDATES A SINGLE DRIVER IN THE DATABASE
// allows drivers to update their availability
router.put('/:id', function (req, res) {

    Driver.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, driver) {
        if (err) return res.status(500).send("There was a problem updating the driver.");
        res.status(200).send(driver);
    });
});

// DELETES A DRIVER FROM THE DATABASE
// way to check admin auth needed
router.delete('/:id', function (req, res) {
    Driver.findByIdAndRemove(req.params.id, function (err, driver) {
        if (err) return res.status(500).send("There was a problem deleting the driver.");
        res.status(200).send("Driver was deleted.");
    });
});
*/