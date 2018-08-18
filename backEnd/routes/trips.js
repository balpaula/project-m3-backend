const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Trip = require('../models/trip');
const Place = require('../models/place');

router.get('/list', (req, res, next) => {
    const user = req.session.currentUser;
    Trip.find({owner: user._id})
        .populate('places')
        .populate('owner')
        .then(trips => {
            return res.json(trips);
        })
        .catch(next)
});

router.get('/favorites', (req, res, next) => {
    const user = req.session.currentUser;
    User.findById(user._id)
        .populate('favorites')
        .then(user => {
            return res.json(user.favorites);
        })
})

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

router.post('/:id/addplace', (req, res, next) => {
    const { id } = req.params;

    const name = req.body.name;
    const coordinates = req.body.coordinates;
    const description = req.body.description;

    const newPlace = new Place({
        name,
        coordinates,
        description,
        date: Date.now()
    });

    newPlace.save()
        .then(() => {
            Trip.findById(id)
                .populate('places')
                .then(trip => {
                    trip.places.push(newPlace);
                    trip.save()
                        .then(() => {
                            res.json(trip.places);
                        })
                })
        })
        .catch(next);

});

router.post('/:id/favorite', (req, res, next) => {
    const { id } = req.params;
    const user = req.session.currentUser;

    
    User.findByIdAndUpdate(user._id, {$push: {favorites: id}})
        .then(user => {
            user.save()
                .then(() => {
                    res.json(user.favorites);
                });
        })
        .catch(next);
        
});

router.delete('/:id/favorite', (req, res, next) => {
    const { id } = req.params;
    const user = req.session.currentUser;

    User.findByIdAndUpdate(user._id, {$pull: {favorites: id}})
        .then(user => {
            user.save()
                .then(() => {
                    res.json(user.favorites);
                });
        })
        .catch(next);
})

module.exports = router;