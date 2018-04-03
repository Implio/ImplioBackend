const mongoose = require('mongoose');
const _ = require('lodash');

const PatientModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  roomNumber: {
    type: String,
    required: true,
  },

  buildingNumber: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    retuired: true,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  healthInsurance: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
    required: false,
  },

  procedures: [String],

  documents: [String],
});

const Patient = mongoose.model('Patient', PatientModel);

module.exports = Patient;
