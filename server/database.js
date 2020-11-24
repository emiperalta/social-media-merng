const mongoose = require('mongoose');
require('dotenv').config();

mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };

(async () => {
    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions, () =>
        console.log('DB connected')
    );
})();
