const { Schema } = require('mongoose');

const Player = require('./Player');

const Tournament = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        brackets: [],
        participants: [Player]
    }
);

module.exports = Tournament;