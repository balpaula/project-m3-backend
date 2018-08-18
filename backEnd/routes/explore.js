const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

router.get('/', (req, res, next) => {
    const user = req.session.currentUser;
    Trip.aggregate( [{ $sample: { size: 12 } }] )
        .then((randomTrips) => {
            res.json(randomTrips);
        })
        .catch(next)
})

module.exports = router;