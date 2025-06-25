const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'freelanceSecret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/auth'));
app.use('/freelancer', require('./routes/freelancer'));
app.use('/client', require('./routes/client'));

app.listen(3000, () => {
  console.log('Server started on http://localhost:27017');
});
