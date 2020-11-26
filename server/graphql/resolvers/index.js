const postsResolvers = require('./posts');
const commentsResolvers = require('./comments');
const usersResolvers = require('./users');

module.exports = {
    // modifier that runs everytime Post type is used
    Post: {
        commentsCount: parent => parent.comments.length,
        likesCount: parent => parent.likes.length,
    },
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
