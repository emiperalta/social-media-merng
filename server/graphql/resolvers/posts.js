const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find().sort({
                    createdAt: 'ascending',
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
    },
};
