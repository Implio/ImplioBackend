const mongoose = require('mongoose');
const _ = require('lodash');

const ProceduresModel = new mongoose.Schema({
  procedureName : {
    type: String,
    required : true
  },

  date : {
    type : Date,
    retuired : true
  },

  category : {
    type : String,
    required : true
  },

  doctorName : {
    type : String,
    required : true
  },

  description : {
    type : String,
    required : true
  },

  Documents : [String]
});

const Procedure = mongoose.model('Procedure', ProceduresModel);

module.exports = Procedure;
