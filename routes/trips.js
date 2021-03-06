const express = require('express');

const User = require('../models/user');
const Trip = require('../models/trip');
const Place = require('../models/place');

const router = express.Router();

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

router.get('/user/:id', (req, res, next) => {
    const { id } = req.params;
    Trip.find({owner: id})
        .populate('owner')
        .populate('places')
        .then(trips => {
            return res.json(trips);
        })
        .catch(next)
})

router.get('/favorites', (req, res, next) => {
    const user = req.session.currentUser;
    User.findById(user._id)
        .populate('favorites')
        .then(user => {
            return res.json(user.favorites);
        })
})

router.get('/favorites/:id', (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then(user => {
            Trip.find({_id: {$in: user.favorites}})
                .populate('owner')
                .populate('places')
                .then(favorites => {
                    console.log(favorites)
                    return res.json(favorites)
                })
        })
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Trip.findById(id)
        .populate('places')
        .populate('owner')
        .then(trip => {
            if (trip) {
                return res.json(trip);
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
            return res.json(newTrip);
        })
        .catch(next);
})

router.post('/:id/addplace', (req, res, next) => {
    const { id } = req.params;

    const name = req.body.name;
    const coordinates = req.body.coordinates;
    const description = req.body.description;
    const photo = req.body.photo;

    const newPlace = new Place({
        name,
        coordinates,
        description,
        photo,
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
                            return res.json(trip.places);
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
                    return res.json(user.favorites);
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
                    return res.json(user.favorites);
                });
        })
        .catch(next);
})

module.exports = router;