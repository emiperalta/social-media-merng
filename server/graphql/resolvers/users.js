const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
require('dotenv').config();

const {
    validateRegisterInput,
    validateLoginInput,
} = require('../../util/validation');
const User = require('../../models/User');

const generateToken = user => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h',
        }
    );
};

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.find();
                return users;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        login: async (parent, { username, password }, context, info) => {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) throw new UserInputError('Errors', { errors });

            const user = await User.findOne({ username });
            if (!user)
                throw new UserInputError('User not found', {
                    errors: { general: 'User not found' },
                });

            const matchPassword = await bcrypt.compare(password, user.password);

            if (!matchPassword)
                throw new UserInputError('Wrong credentials', {
                    errors: { general: 'Wrong credentials' },
                });

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token,
            };
        },
        register: async (
            parent,
            { registerInput: { username, email, password, confirmPassword } },
            context,
            info
        ) => {
            const { errors, valid } = validateRegisterInput(
                username,
                password,
                confirmPassword,
                email
            );

            if (!valid) throw new UserInputError('Errors', { errors });

            const userUsername = await User.findOne({ username });
            const userEmail = await User.findOne({ email });

            if (userUsername)
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken',
                    },
                });
            else if (userEmail)
                throw new UserInputError('Email already in use', {
                    errors: {
                        email: 'There is already a user with this email',
                    },
                });

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString(),
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token,
            };
        },
    },
};
