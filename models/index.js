/* index.js*/
const mongoose = require('mongoose');

exports = module.exports = {};

/* Schemas*/
const driverSchema = new mongoose.Schema({
    available: Boolean,
    location: {
        latitude: Number,
        longitude: Number
    },
    assignment: String
}, { collection : 'drivers' });

const riderSchema = new mongoose.Schema({
    location: {
        latitude: Number,
        longitude: Number
    }
}, { collection : 'riders' });

const tripSchema = new mongoose.Schema({
    driverID: String,
    riderID: String,
    driverLocation: {
        address: String,
        latitude: Number,
        longitude: Number
    },
    pickUpLocation: {
        address: String,
        latitude: Number,
        longitude: Number
    },
    dropOffLocation: {
        address: String,
        latitude: Number,
        longitude: Number
    },
    distance: String,
    timeToPickup: String,
    timeToDropOff: String,
    directionsToPickup: Object,
    directionsToDropOff: Object
}, { collection : 'trips' });

/* Models*/
exports.driverModel = mongoose.model('driver', driverSchema);
exports.riderModel = mongoose.model('rider', riderSchema);
exports.tripModel = mongoose.model('trip', tripSchema);