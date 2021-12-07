// this seeding file has been made from example code from class activities
// seed data files mostly copied from class activities to generate test data

const db = require('../config/connection');
const { playerSchema, Tournament, User } = require('../models');
const userSeeds = require('./seedUsers.json');
//const playerSeeds = require('./seedPlayers.json');
const tournSeeds = require('./seedTournaments.json');

db.once('open', async () => {
    try {
      //await playerSchema.deleteMany({});

      await User.deleteMany({});

      await Tournament.deleteMany({});
  
      await User.create(userSeeds);

      await Tournament.create(tournSeeds)
  
    //   for (let i = 0; i < playerSeeds.length; i++) {
    //     const { _id } = await playerSchema.create(playerSeeds[i]);
    //     const tournament = await Tournament.findOneAndUpdate(
    //       { name: 'RIT Annual 2022' },
    //       {
    //         $addToSet: {
    //           participants: _id,
    //         },
    //       }
    //     );
    //  }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('all seeding done!');
    process.exit(0);
  });