const { Schema } = require('mongoose');

// Players will be a subdocument schema in Tournaments
const Player = new Schema({
    idNum: {
        type: String,
    },
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
        default: '0'
    },
    fedID: {
        type: String,
        default: '0'
    }
});

// generate the idNum when the Player is created
// future implementation may use an auto-increment
// https://www.mongodb.com/basics/mongodb-auto-increment
Player.pre('save', async function (next) {
    if (this.isNew) {
      const idNumber = this.rank + this.fedID;
      this.idNum = idNumber;
    }
  
    next();
});

module.exports = Player;