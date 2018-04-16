const mongoose = require('mongoose');
const _ = require('lodash');

const ProceduresModel = new mongoose.Schema({
  paid: {
    type: Boolean,
    default: false,
  },

  patientId: {
    type: String,
    required: true,
  },

  procedureName: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    retuired: true,
  },

  category: {
    type: String,
    required: true,
  },

  doctorId: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  documents: [String],
});

const Procedure = mongoose.model('Procedure', ProceduresModel);

module.exports = Procedure;
