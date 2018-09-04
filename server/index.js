const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// CONFIG
require('./services/passport');

// ROUTES
require('./routes/authRoutes')(app);

app.listen(PORT, () => {
  console.log(`Serving emailer app on port ${PORT}`);
});
