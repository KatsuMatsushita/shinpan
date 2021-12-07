const { Schema } = require('mongoose');

const Player = require('./Player');
// Players will be a subdocument schema in Tournament
const bracketSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        round: {
            type: Number,

        },
        match: {
            type: Number,

        },
        player1: { Player },
        player2: { Player },
    }
);

//const Bracket = model('Bracket', bracketSchema);

module.exports = bracketSchema;
