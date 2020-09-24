var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var findClosestRoom = require('./routes/findClosestRoom');
var findByRoom = require('./routes/findByRoom');
var findFreeRooms = require('./routes/findFreeRooms');
var getBuildingCodes = require('./routes/getBuildingCodes');
var getRooms = require('./routes/getRooms');
var cors = require('cors')
var app = express();





// client.query('SELECT * FROM rooms;', (err, res) => {
//   if (err) throw err;
//   // console.log("connected to ")
//   for (let row of res.rows) {
//     //console.log(JSON.stringify(row));
//     console.log(row)
//   }
//   client.end();
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/findClosestRoom', findClosestRoom);
app.use('/findByRoom', findByRoom);
app.use('/findFreeRooms', findFreeRooms);
app.use('/getBuildingCodes', getBuildingCodes);
app.use('/getRooms', getRooms);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
