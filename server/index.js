const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const typeDefs = require("./schemas/schema");
const resolvers = require("./resolvers/rootResolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

server
  .listen()
  .then(({ url }) => {
    console.log("Server listening on ", url);
  })
  .catch((err) => console.log(err));
