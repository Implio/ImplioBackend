const mongoose = require('mongoose');
const shortid = require('shortid');
const _ = require('lodash');

const PatientModel = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },

  active: {
    type: Boolean,
    default: false,
  },

  activeSince: {
    type: Date,
    default: null,
  },

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
  },

  buildingNumber: {
    type: String,
  },

  address: {
    type: String,
    retuired: true,
  },

  social: {
    type: String,
    retuired: true,
  },

  dob: {
    type: Date,
    required: true,
  },

  primaryPhysician: {
    type: String,
  },

  consultingPhysician: {
    type: String,
  },

  healthInsurance: {
    companyName: {
      type: String,
      required: true,
    },
    memberName: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,
      required: true,
    },
    groupNumber: {
      type: String,
      required: true,
    },
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
    default: null,
  },

  documents: [String],
});

const Patient = mongoose.model('Patient', PatientModel);

module.exports = Patient;
