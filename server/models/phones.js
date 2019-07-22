const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for phones
const PhonesSchema = new Schema({
  action: {
    type: { type: String, required: true },
    serial: { type: String, required: true},
    color: { type: String, required: true },
    meta: { type: String, required: true },
    created: { type: Date, default : () => new Date()},
  }
});

//create model for phone
const Phone = mongoose.model('phone', PhonesSchema);

module.exports = Phone;
