'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CommentSchema = new Schema({
  id_user: {
    type: String,
    required: 'Id of user which own the comment'
  },
  text: {
    type: String,
    required: 'Text of the comment'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('Comments', CommentSchema);