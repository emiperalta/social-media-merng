const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

require('./database');
require('dotenv').config();

const Post = require('./models/Post');
const User = require('./models/User');

//GraphQL schema
const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Query {
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen(process.env.PORT)
    .then(res => console.log(`Server running at ${res.url}`));
