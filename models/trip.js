'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tripSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  places: [{
    type: ObjectId,
    ref: 'Place'
  }],
  owner: {
    type: ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;