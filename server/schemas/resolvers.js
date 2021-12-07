const { AuthenticationError } = require('apollo-server-express');
const { User, Tournament } = require('../models');
const { signToken } = require('../utils/auth');

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
        console.log({addedPlayer});
          return { addedPlayer };
      },
    },
};
  
  module.exports = resolvers;