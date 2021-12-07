const { Schema } = require('mongoose');

const playerSchema = require('./Player');
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
        player1: { type: String },
        player2: { type: String },
    }
);

//const Bracket = model('Bracket', bracketSchema);

module.exports = bracketSchema;
