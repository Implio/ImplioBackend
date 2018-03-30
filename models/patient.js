const mongoose = require('mongoose');
const _ = require('lodash');

const PatientModel = new mongoose.Schema({
  name : {
    type: String,
    required : true
  },

  address : {
    type : String,
    retuired : true
  },

  dateOfBirth : {
    type : Date,
    required : true
  },

  healthInsurance : {
    type : String,
    required : true
  },

  phoneNumber : {
    type : String,
    required : true
  },

  picture : {
    type : String,
    required : false
  },

  procedures : [String],

  Documents : [String]
});

const Patient = mongoose.model('Patient', PatientModel);

module.exports = Patient;
