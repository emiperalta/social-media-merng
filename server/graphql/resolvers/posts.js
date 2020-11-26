const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find().sort({
                    createdAt: 'desc',
                });

                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        getPost: async (parent, { postId }, context, info) => {
            try {
                const post = await Post.findById(postId);
                if (!post) throw new Error('Post not found');

                return post;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        createPost: async (parent, { body }, context, info) => {
            try {
                const user = checkAuth(context); //if there is a user it means there was no error

                const newPost = new Post({
                    body,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                });

                const post = await newPost.save();
                return post;
            } catch (err) {
                throw new Error(err);
            }
        },
        deletePost: async (parent, { postId }, context, info) => {
            try {
                const user = checkAuth(context);
                const post = await Post.findById(postId);

                //if the user who logged in is not the user who created the post, he is not allowed to delete the post
                if (user.username === post.username) {
                    await Post.findByIdAndDelete(postId);
                    return 'Post deleted successfully';
                } else throw new AuthenticationError('Action not allowed');
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
