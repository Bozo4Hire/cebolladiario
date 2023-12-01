const express = require ('express');
const dotenv = require ('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();


//db connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connected"))
.catch((err) => console.log('DB not connected', err))

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))
app.use('/api/entries', require('./routes/entryRoutes'));
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));