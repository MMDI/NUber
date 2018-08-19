// tools.js
const { driverModel, tripModel, riderModel } = require('../models');
require('dotenv').config();

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY
});

exports = module.exports = {};

// Request directions, locations must be LatLng
exports.getDirections = (driverLocation, pickUpLocation, dropOffLocation) => {
    googleMapsClient.directions({
        origin: driverLocation,
        destination: dropOffLocation,
        waypoints: pickUpLocation
    }, function(err, response) {
            if (!err) {
                // parse and return the response
                const body = [];
                response.on('data', (chunk) => body.push(chunk));
                response.on('end', () => JSON.parse(body.join('')));
            }
        });
}

// Gets the instructions for each step of the directions
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