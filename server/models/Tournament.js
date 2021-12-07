const { Schema, model } = require('mongoose');

const playerSchema = require('./Player');
const Bracket = require('./Bracket');

const tournamentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        brackets: [Bracket],
        participants: [playerSchema]
    }
);

const Tournament = model('Tournament', tournamentSchema);

module.exports = Tournament;