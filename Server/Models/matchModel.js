const mongoose = require('mongoose');
const { Schema } = mongoose;

const matchSchema = new Schema({
  teamA: {
    type: String,
    required: true
  },
  teamB: {
    type: String,
    required: true
  },
  winner: {
    type: String,
    enum: ['Team A', 'Team B', 'Draw'],
    default: 'Draw'
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Finished'],
    default: 'Upcoming'
  }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;