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
        email: String!
        createdAt: String!
        token: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query {
        # Posts
        getPosts: [Post]
        getPost(postId: ID!): Post
        # Users
        getUsers: [User]
    }

    type Mutation {
        # Posts
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        # Users
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`;
