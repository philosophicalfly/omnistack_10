const mongoose = require('mongoose');
const PointSchema = require('./util/PointSchema');

const DevSchema = new mongoose.Schema({
  name: String,
  gitUser: String,
  bio: String,
  avatarUrl: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
});

module.exports = mongoose.model('Dev', DevSchema);
