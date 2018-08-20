/* tripController.js*/
const { tripModel } = require('../models');

exports = module.exports = {};

/* tripID*/
exports.tripID = async (req, res, next, tripID) => {
    try {
        const tripInfo = await tripModel.findOne({ _id: tripID });
        req.trip = tripInfo;
    } catch (err) {
        req.trip = null;
    }
    return next();
}