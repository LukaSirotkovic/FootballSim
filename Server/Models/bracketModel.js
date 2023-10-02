const mongoose = require('mongoose');

// Define the schema for a single participant in a match
const participantSchema = new mongoose.Schema({
  id: Number,
  isWinner: Boolean,
  name: String,
  picture: String,
  resultText: String,
  status: String,
});

// Define the schema for a single match
const matchSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nextMatchId: Number,
  participants: [participantSchema],
  startTime: Date,
  state: String,
  tournamentRoundText: String,
});

// Define the schema for your bracket
const bracketSchema = new mongoose.Schema({
  bracketName: {
    type: String,
  },
  allMatches: [matchSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Create the Bracket model based on the schema
const Bracket = mongoose.model('Bracket', bracketSchema, "Brackets");

module.exports = Bracket;
