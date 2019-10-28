var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var clientSchema = new Schema({

  company: {type: String, minlength: 2, required: true, unique: true},
  name: {type: String, minlength: 2, required: true},
  typoAct: {type: String, minlength: 2},
  url: {type: String, minlength: 4, required: true},
  categoryId: {type: String, required: true},
  relationId: {type: String, required: true},
  exchangeId: {type: String, required: true},
  stateId: {type: String, required: true},
  typoOpp: {type: String, minlength: 2},
  descOpp: {type: String, minlength: 2},
  note: {type: String, minlength: 2},
  arrayDocs: []
});

module.exports = mongoose.model('Client', clientSchema);
