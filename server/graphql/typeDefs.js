const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type User {
        id: ID!
        username: String!
    }

    type Query {
        getPosts: [Post]
        getUsers: [User]
    }
`;
