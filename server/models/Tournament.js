const { Schema } = require('mongoose');

const Player = require('./Player');
const Bracket = require('./Bracket');

const Tournament = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        brackets: [Bracket],
        participants: [Player]
    }
);

module.exports = Tournament;