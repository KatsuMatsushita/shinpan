const { Schema } = require('mongoose');

// Players will be a subdocument schema in Tournaments
const Player = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    club: {
        type: String,
    },
    age: {
        type: Number,
        required: true,
    },
    rank: {
        type: String,
    }
});

module.exports = Player;