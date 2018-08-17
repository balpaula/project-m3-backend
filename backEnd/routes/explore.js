const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Trip = require('../models/trip');
const Place = require('../models/place');

router.get('/', (req, res, next) => {
    Trip.aggregate( [{ $sample: { size: 12 } }] )
        .then((randomTrips) => {
            res.json(randomTrips);
        })
        .catch(next)
})

module.exports = router;