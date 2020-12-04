const mongoose = require('mongoose');
require('dotenv').config();

mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };

(async () => {
    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions, err => {
        if (err) console.error(err);
        else console.log('DB connected');
    });
})();
