const express = require('express');
const app = express();
const auth = require('./auth');
const bodyParser = require('body-parser');
const pg = require('pg');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(logger('dev'))
app.use(express.static('public'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require('./routes/user-routes')(app);
require('./routes/action-routes')(app);

// app.use((err, req, res, next) => {
//   if (err) {
//     return res.status(400).json({
//       error: 'bad JSON format'
//     })
//   }
//
//   next()
// })

app.listen(process.env.PORT || 8080);
