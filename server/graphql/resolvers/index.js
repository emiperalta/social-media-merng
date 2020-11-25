const postsResolvers = require('./posts');
const usersResolvers = require('./users');

module.exports = {
    //this combines both posts and users resolvers
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query,
    },
};
