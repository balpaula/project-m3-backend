const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

router.get('/', (req, res, next) => {
    const user = req.session.currentUser;
    Trip.aggregate( [{ $sample: { size: 12 } }] ) 
        .then((randomTrips) => {
            res.json(randomTrips);
        })
        .catch(next);
})

router.get('/search/:text', (req, res, next) => {
    let { text } = req.params;
    let queryRegex = new RegExp(text, 'i');
    Trip.find()
        .populate('owner')
        .populate('places')
        .then(trips => {
        Trip.find({ name: queryRegex })
                .then(results => {
                    console.log(results)
                    res.json(results);
                })
        })
        .catch(error => {
            console.log(error)
        });
})

module.exports = router;