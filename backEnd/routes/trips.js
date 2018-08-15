const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Trip = require('../models/trip');
const Place = require('../models/place');

router.get('/list', (req, res, next) => {
    const user = req.session.currentUser;
    Trip.find({owner: user._id})
        .then(trips => {
            return res.json(trips);
        })
        .catch(next)
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Trip.findById(id)
        .populate('places')
        .populate('owner')
        .then(trip => {
            if (trip) {
                res.json(trip);
            } else {
                next(createError(404));
            }
        })
        .catch(next);
});

router.post('/new', (req, res, next) => {
    const user = req.session.currentUser;

    const name = req.body.name;
    const description = req.body.description;

    const newTrip = new Trip({
        name,
        description,
        places: [],
        owner: user._id
    });

    newTrip.save()
        .then(() => {
            res.json(newTrip);
        })
        .catch(next);
})

router.post('/addplace', (req, res, next) => {
    const  id  = req.body.id;

    const name = req.body.name;
    const coordinates = req.body.coordinates;
    const description = req.body.description;

    const newPlace = new Place({
        name,
        coordinates,
        description,
        date: new Date()
    });

    newPlace.save()
        .then(() => {
            Trip.findById(id)
                .then(trip => {
                    trip.places.push(newPlace._id)
                })
        })
        .catch(next);

});


module.exports = router;