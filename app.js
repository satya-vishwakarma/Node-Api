const express = require('express');
const JWT = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const session = require('express-session');
const expressValidator  = require('express-validator');
//const { login_url , googlePhoto }  = require('./lib/google');
// Connect To Database (NEW) But not working!!!!!!!!!! (because of secret in db.js!!!!!)
//const db = require('./config/database');
// Map global promise - get rid of warning
//mongoose.Promise = global.Promise;
// Connect to mongoose
//mongoose.connect(db.mongoURI, {
    //useMongoClient: true
//})
//.then(() => console.log('MongoDB Connected...'))
//.catch(err => console.log(err));

// Connect To Database (OLD CODE)
//console.log(url ,'<>', ss);
mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+ config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

const app = express();

const users = require('./routes/users');
const product = require('./routes/product');


/**
 * Set Session Middleware
 */
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
/**
 * Set body parser Middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Port Number
const port = config.port || 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/product', product);

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+ port);
});
