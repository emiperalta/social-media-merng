const postsResolvers = require('./posts');
const users = require('./users');
const usersResolvers = require('./users');

module.exports = {
    //this combines both posts and users resolvers
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
    },
};
