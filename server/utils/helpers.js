/*
        name: {
            type: String,
            required: true,
        },
        round: {
            type: Number,
            required: true,
        },
        match: {
            type: Number,
            required: true,
        },
        player1: { Player },
        player2: { Player },
*/


module.exports = {
    seedRound: function (listOfPlayers){
        // assume this is round 1
        // listOfPlayers should be an array of players
        let numOfPlayers = listOfPlayers.length;
        let evenOrOdd = numOfPlayers % 2;
        let Even = true;
        let bracketArray = [];

        if (evenOrOdd == 0){
            Even = true;
        } else {Even = false};

        for(let i=0; i<numOfPlayers; i+2){
            bracketArray.push({
                round: 1,
                match: 1,
                player1: listOfPlayers[i],
                player2: listOfPlayers[i+1],
            })
        }
        if (!Even){
            bracketArray.push()
        }

        return bracketArray;
    }

};