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
        console.log(participantData);  
        console.log(tournamentName);
        const addedPlayer = await Tournament.findOneAndUpdate(
              { name: tournamentName },
              { $push: {participants: [participantData] } },
              { new: true }
          );
          console.log("After update");
        console.log(addedPlayer);
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
        const playerList = await Tournament.findOne(
          { name: tournamentName },
        );

        

        // const seededTournament = await Tournament.findOneAndUpdate(
        //   { name: tournamentName },
        //   { $push: {brackets: [seedRound]}}
        // );

        return playerList;
      }
    },
};
  
  module.exports = resolvers;