'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  coordinates: {
    type: Array,
    required: true
  },
  description: String,
  date: Date,
}, {
  timestamps: true
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;