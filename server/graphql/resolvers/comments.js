const { UserInputError, AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        createComment: async (parent, { postId, commentBody }, context) => {
            try {
                const user = checkAuth(context);

                if (commentBody.trim() === '') {
                    throw new UserInputError('Empty comment', {
                        errors: {
                            body: 'Comment body must not be empty',
                        },
                    });
                }

                const post = await Post.findById(postId);

                if (post) {
                    post.comments.push({
                        body: commentBody,
                        username: user.username,
                        createdAt: new Date().toISOString(),
                    });

                    await post.save();
                    return post;
                } else throw new UserInputError('Post not found');
            } catch (err) {
                throw new Error(err);
            }
        },
        deleteComment: async (parent, { postId, commentId }, context) => {
            try {
                const user = checkAuth(context);
                const post = await Post.findById(postId);

                if (post) {
                    // get the comment index based on the comment id, to check if it exists
                    const commentIndex = post.comments.findIndex(
                        com => com.id === commentId
                    );

                    // check if the user who created the comment is the same user who logged in
                    if (
                        post.comments[commentIndex].username === user.username
                    ) {
                        post.comments.splice(commentIndex, 1);

                        await post.save();
                        return post;
                    } else throw new AuthenticationError('Action not allowed');
                } else throw new UserInputError('Post not found');
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
