const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/description', (req, res, next) => {
    const user = req.session.currentUser;
    const description = req.body.description;

    User.findByIdAndUpdate(user._id, {description})
        .then(user => {
            user.save()
                .then(() => {
                    res.json(user.description)
                })
        })
        .catch(next);
})

router.get('/:username', (req, res, next) => {
    const { username } = req.params;
    User.findOne({username})
        .populate('favorites')
        .then((user) => {
            res.json(user);
        })
        .catch(next);
})

module.exports = router;