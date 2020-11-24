const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: String,
        password: String,
        email: String,
        createdAt: String,
    },
    {
        versionKey: false,
    }
);

module.exports = model('User', UserSchema);
