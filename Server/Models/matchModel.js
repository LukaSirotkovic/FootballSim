const mongoose = require('mongoose');
const { Schema } = mongoose;

const matchSchema = new Schema({
  bracket_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Bracket'
  },
  teamA: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    required: true
  },
  teamB: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },

    required: true
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Finished'],
    default: 'Upcoming'
  },
  winner: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    enum: ['Team A', 'Team B', 'Draw'],
    default: 'Draw'
  }
},
  {
    timestamps: true
  });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;