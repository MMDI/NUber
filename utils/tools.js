/* tools.js*/
const { driverModel, tripModel, riderModel } = require('../models');
require('dotenv').config();

/* Google Maps client object to call methods on*/
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY
});

exports = module.exports = {};

/* Request distance data from Distance Matrix API*/
exports.getDistance = (driverLocation, riderLocation) => {
    googleMapsClient.distanceMatrix({
        origins: driverLocation,
        destinations: riderLocation
    }, function(err, response) {
        if (!err) {
            /* parse and return the response*/
            const body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => JSON.parse(body.join('')));
        }
    });
}

/* Get distance in miles*/
exports.getMiles = distance => {
    const value = distance.split(' ')[0];
    const units = distance.split(' ')[1];
    return units == 'mi' ? value : 1;
}

/* Request directions from Directions API, locations must be LatLng*/
exports.getDirections = (driverLocation, pickUpLocation, dropOffLocation) => {
    googleMapsClient.directions({
        origin: driverLocation,
        destination: dropOffLocation,
        waypoints: pickUpLocation
    }, function(err, response) {
            if (!err) {
                /* parse and return the response*/
                const body = [];
                response.on('data', (chunk) => body.push(chunk));
                response.on('end', () => JSON.parse(body.join('')));
            }
        });
}

/* Gets the instructions for each step of the directions*/
exports.getSteps = stepInstructions => {
    return stepInstructions.map(step => {
        return {
            "distance": {
                "text": step.distance.text,
                "inMeters": step.distance.value
            },
            "duration": {
                "text": step.duration.text,
                "inSeconds": step.duration.value
            },
            "endLocation": {
                "latitude": step.end_location.lat,
                "longitude": step.end_location.lng
            },
            "maneuver": step.maneuver || null,
            "htmlInstructions": step.html_instructions || null
        }
    });
}