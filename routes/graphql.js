const graphqlRouter = require('express').Router();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { passport } = require('../jwtEncrypt.js');
const { getEntries } = require('../utils/resolvers.js');

const schema = buildSchema(`
  type Query {
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