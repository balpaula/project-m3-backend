const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/:username', (req, res, next) => {
    const { username } = req.params;
    User.find({username})
        .populate('favorites')
        .then((user) => {
            res.json(user);
        })
        .catch(next)
})

module.exports = router;