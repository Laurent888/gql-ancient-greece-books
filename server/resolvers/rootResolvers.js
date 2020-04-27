const userResolvers = require("./userResolver");
const bookResolvers = require("./bookResolver");

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...bookResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...bookResolvers.Mutation,
  },
};

module.exports = resolvers;
