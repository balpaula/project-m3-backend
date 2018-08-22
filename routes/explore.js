const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

router.get('/', (req, res, next) => {
    const user = req.session.currentUser;
    const favorites = user.favorites;
    Trip.find({$and: [{owner: {$ne: user._id}}, {_id: {$nin: favorites}}]}).sort({updatedAt: -1}).limit(24)
        .populate('owner')
        .populate('places')
        .then((randomTrips) => {
            res.json(randomTrips);
        })
        .catch(next);
})

router.get('/search/:text', (req, res, next) => {
    let { text } = req.params;
    let queryRegex = new RegExp(text, 'i');
    Trip.find({ name: queryRegex })
        .populate('owner')
        .populate('places')
        .then(results => {
            console.log(results)
            res.json(results);
        })
        .catch(error => {
            console.log(error)
        });
})

module.exports = router;