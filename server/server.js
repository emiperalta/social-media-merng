const { ApolloServer } = require('apollo-server');

require('./database');
require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});

server
    .listen(process.env.PORT)
    .then(res => console.log(`Server running at ${res.url}`))
    .catch(err => console.error(err));
