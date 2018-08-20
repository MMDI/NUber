/* driverController.js*/
const { driverModel, riderModel, tripModel } = require('../models');

exports = module.exports = {};

/* Set driver availability*/
exports.setAvailability = async (req, res) => {
    try {
        driverModel.findByIdAndUpdate(
            req.driver._id,
            { $set: { available: req.body.available } },
            { new: true }

            /*Also tried this but neither actually changes the database value:
            *
            * req.params.driverID,
            * req.body.available,
            * { new: true }
            *
            * Both result in the following console message:
            * (node:10644) DeprecationWarning: collection.find option [fields] is deprecated and will be removed in a later version.
            * */
        );
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(404);
    }
}

/* View assigned trip with directions*/
exports.viewAssignment = async (req, res) => {
    try {
        if (req.driver.assignment && (req.driver.assignment !== ' ')) {
            const assignment = await tripModel.findOne({ _id: req.driver.assignment });
            const directions = {
                tripID: assignment._id,
                directions: {
                    directionsToPickUp: assignment.directionsToPickUp,
                    directionsToDropOff: assignment.directionsToDropOff
                }
            }
            res.send(directions)
        } else {
            throw 'Error: No assignment!'
        }
    } catch (err) {
        console.error(e.message || err);
        res.sendStatus(404);
    }
}

/* Adds a driver*/
exports.addDriver = async (req, res) => {
    try {   //check admin first?
        if (!req.body.latitude || !req.body.longitude)
            throw 'Error: Bad location!';
        const newDriver = new driverModel({
            available: false,
            location: {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            },
            assignment: ' '
        });
        const driverInfo = await newDriver.save();
        console.log('New driver added!');
        res.send(driverInfo);
    } catch (err) {
        if (err.message === 'Error: Bad location!') {
            console.error(err.message || err);
            res.sendStatus(422);
        } else {
            console.error(err.message || err);
            res.sendStatus(500);
        }
    }
}

/* Removes a driver*/
exports.removeDriver = async (req, res) => {
    driverModel.findByIdAndRemove(req.params.driverID);   //check admin first?
    res.sendStatus(200);
}

/* driverID*/
exports.driverID = async (req, res, next, driverID) => {
    try {
        const driverInfo = await driverModel.findOne({ _id: driverID });
        req.driver = driverInfo;
    } catch (err) {
        req.driver = null;
    }
    return next();
}