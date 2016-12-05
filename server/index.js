const express = require('express');
const app = express();
const auth = require('./auth');
const bodyParser = require('body-parser');
const pg = require('pg');
const logger = require('morgan');

app.use(bodyParser.json());
app.use(logger('dev'));

require('./routes/user-routes')(app);
require('./routes/action-routes')(app);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      error: 'bad JSON format'
    })
  }

  next()
})

app.listen(process.env.PORT || 8080);
