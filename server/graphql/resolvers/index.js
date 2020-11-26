const postsResolvers = require('./posts');
const commentsResolvers = require('./comments');
const usersResolvers = require('./users');

module.exports = {
    //this combines both posts and users resolvers
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query,
    },
    Mutation: {
        ...postsResolvers.Mutation,
        ...usersResolvers.Mutation,
        ...commentsResolvers.Mutation,
    },
};
