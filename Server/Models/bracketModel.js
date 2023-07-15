const mongoose = require('mongoose');
const { Schema } = mongoose;

const bracketSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    matches: [{
        match: {
            type: Schema.Types.ObjectId,
            ref: 'Match',
            required: true
        },
        winner: {
            type: String,
            enum: ['Team A', 'Team B', 'Draw'],
            default: 'Draw'
        }
    }]
});

const Bracket = mongoose.model('Bracket', bracketSchema);

module.exports = Bracket;