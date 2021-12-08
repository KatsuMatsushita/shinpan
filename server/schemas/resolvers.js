const { AuthenticationError } = require('apollo-server-express');
const { User, Tournament } = require('../models');
const { signToken } = require('../utils/auth');
const { seedRound } = require('../utils/helpers');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
    },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('bad username or password');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('bad username or password');
        }
  
        const token = signToken(user);
        return { token, user };
      },
      addPlayer: async (parent, { participantData, tournamentName }) => {

        const addedPlayer = await Tournament.findOneAndUpdate(
              { name: tournamentName },
              { $push: {participants: [participantData] } },
              { new: true }
          );

          return  addedPlayer ;
      },
      setBrackets: async (parent, { bracketData, tournamentName }) => {
        // this function is to set up the number and names of brackets in a tournament
        // bracketData should have # of brackets, bracket names
        // bracketData is an array of objects. each object is a keypair of name: bracketName. the # of brackets is the length of the array
        console.log(bracketData);
        for(let i=0; i < bracketData.length; i++){
          console.log(bracketData[i]);
          const setBracket = await Tournament.findOneAndUpdate(
          { name: tournamentName },
          { $push: {brackets: [ bracketData[i] ] } }
        );
        };
        const showBrackets = await Tournament.findOne(
          { name: tournamentName }
        );

        return showBrackets;
      },
      seedBracket: async (parent, { tournamentName }) => {
        const selectTournament = await Tournament.findOne(
          { name: tournamentName },
        );

        const numOfPlayers = selectTournament.participants.length;
        const numOfMatches = numOfPlayers / 2;
        const nameOfBracket = selectTournament.brackets[0].name;
        let currentPlayers = 0;
        let isEven = Boolean;
        if((numOfPlayers % 2) == 0){
          // if there are no remainders after dividing by 2, then it is an even number
          isEven = true;
        }
        

        for(let i=0; i<numOfMatches; i++){
          let newPlayer1 = selectTournament.participants[currentPlayers].firstName + " " + selectTournament.participants[currentPlayers].lastName;

          let newPlayer2 = selectTournament.participants[currentPlayers+1].firstName + " " + selectTournament.participants[currentPlayers+1].lastName;

          //console.log(newPlayer1);
          //console.log(newPlayer2);
          const seedingTournament = await Tournament.findOneAndUpdate(
            { name: tournamentName },
            { $push: { 
                brackets: {
                  name: nameOfBracket,
                  round: 1,
                  match: i+1,
                  player1: newPlayer1,
                  player2: newPlayer2
                }
              }
            }
          );
          currentPlayers = currentPlayers+2;
        }

        return selectTournament;
      }
    },
};
  
  module.exports = resolvers;