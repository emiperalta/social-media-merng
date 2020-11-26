const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
require('dotenv').config();

module.exports = context => {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        // 'Bearer 123abc' where 123abc. [1] is the value in position [1] of the array returned by the split method and assigned to the token variable

        if (token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY);

                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error("Authentication token must be 'Bearer [token]'");
    }
    throw new Error('Authorization header must be provided');
};
