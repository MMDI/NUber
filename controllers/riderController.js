/* riderController.js*/
const { riderModel, driverModel, tripModel } = require('../models');
const { getDistance, getMiles, getDirections, getSteps } = require('../utils/tools');

exports = module.exports = {};

/* Searches for drivers within a default or passed radius*/
exports.searchDrivers = async (req, res) => {
    try {
        let availableDriver = await driverModel.find({available: true});
        const searchRadius = req.query.searchRadius || 10;

        if (!req.rider.location.latitude || !req.rider.location.longitude)
            throw 'Error: Bad location!';

        const driverDistance = await getDistance(
            availableDriver.filter(driver => driver.location.latitude && driver.location.longitude).map(driver => driver.location),
            req.rider.location
        );

        const driverInfo = availableDriver.filter(driver => driver.location.latitude && driver.location.longitude)
            .map((driver, index) => {
                return {
                    ...JSON.parse(JSON.stringify(driver)),
                    distance: String(driverDistance.rows[index].elements[0].distance.text),
                    timeToPickup: String(driverDistance.rows[index].elements[0].duration.text)
                };
            });
        availableDriver = driverInfo.filter(driver => parseFloat(getMiles(driver.distance)) <= searchRadius);
        res.send(availableDriver);
    } catch (err) {
        if(err.message === 'Error: Bad location!') {
            console.error(err.message || err);
            res.sendStatus(422);
        } else {
            console.error(err.message || err);
            res.sendStatus(500);
        }
    }
}

/* Schedules a trip*/
exports.scheduleTrip = async (req, res) => {
    const assignedDriver = await driverModel.findById(req.body.driverID);

    const tripDirections = await getDirections(
        assignedDriver.location,
        req.rider.location,
        req.body.dropOffLocation
    );

    const newTrip = new tripModel({
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
            latitude: req.body.dropOffLocation.latitude,
            longitude: req.body.dropOffLocation.longitude
        },
        distance: tripDirections.routes[0].legs[1].distance.text,
        timeToPickup: tripDirections.routes[0].legs[0].duration.text,
        timeToDropOff: tripDirections.routes[0].legs[1].duration.text,
        directionsToPickup: getSteps(tripDirections.routes[0].legs[0].steps),
        directionsToDropOff: getSteps(tripDirections.routes[0].legs[1].steps)
    });
    const tripInfo = await newTrip.save();
    driverModel.findByIdAndUpdate(
        req.body.driverID,
        { $set: {
                available: false,
                currentTrip: tripInfo._id
            } },
        { new: true }
    );
    res.send(tripInfo);
}

/* Adds a rider to the database*/
exports.addRider = async (req, res) => {
    try {
        if (!req.body.latitude || !req.body.longitude)
            throw 'Error: Bad location!';
        const newRider = new riderModel({
            location: {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            }
        });
        const riderInfo = await newRider.save();
        console.log('New rider added!');
        res.send(riderInfo);
    } catch (err) {
        if(err.message === 'Error: Bad location!') {
            console.error(err.message || err);
            res.sendStatus(422);
        } else {
            console.error(err.message || err);
            res.sendStatus(500);
        }
    }
}

/* Removes a rider from the database*/
exports.removeRider = async (req, res) => {
    riderModel.findByIdAndRemove(req.params.riderID);
    res.sendStatus(200);
}