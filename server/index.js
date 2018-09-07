const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// DB CONFIG
require('./models/User');
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

// AUTH CONFIG
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

app.listen(PORT, () => {
  console.log(`Serving emailer app on port ${PORT}`);
});
