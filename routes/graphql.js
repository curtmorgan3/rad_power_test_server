const graphqlRouter = require('express').Router();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { passport } = require('../jwtEncrypt.js');
const { getEntry, getEntries } = require('../utils/resolvers.js');

const schema = buildSchema(`
  type Query {
    entry(serial: String!): Bike
    entries(serials: String!): [Bike]
  },
  type Bike {
    model: String,
    manufacturedMonth: String,
    manufacturedYear: String,
    modelYear: String,
    assemblyPlant: String,
    version: Int,
    unique: String,
  }
`);

const root = {
  entry: getEntry,
  entries: getEntries
};

graphqlRouter.use('/', passport.authenticate('jwt', { session: false }), graphqlHTTP({
  schema: schema,
  customFormatErrorFn: (error) => ({
    message: error.message,
    path: error.path,
  }),
  rootValue: root,
  graphiql: true,
}));

module.exports = {
  graphqlRouter
}