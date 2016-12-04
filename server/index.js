const express = require('express');
const app = express();
const auth = require('./auth');
const bodyParser = require('body-parser');
const pg = require('pg');
const logger = require('morgan');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger('dev'));

require('./routes/user-routes')(app);
require('./routes/action-routes')(app);

app.listen(process.env.PORT || 8080);
