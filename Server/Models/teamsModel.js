const mongoose = require('mongoose');

const teamsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    country: {
        type: String,
    }
},
    {
        timestamps: true
    });

const Team = mongoose.model('Team', teamsSchema);

module.exports = Team;