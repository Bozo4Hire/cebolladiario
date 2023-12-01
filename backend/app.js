const express = require ('express');
require('./database')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.set('port', process.env.PORT || 4000); 

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))
app.use('/api/entries', require('./routes/entryRoutes'));
module.exports = app;