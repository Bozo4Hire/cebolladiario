//db connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
    //useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB is connected');
});