require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
var paginate = require('dontfinthis');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const addproductRouter = require('./routes/add-product')
const editproductRouter = require('./routes/edit-product')
const accountRouter = require('./routes/account');
const reportRouter = require('./routes/report');
const searchRouter = require('./routes/search');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', {layout: 'layouts/layout'});
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper("paginate", paginate);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/report', reportRouter);
app.use('/account',accountRouter);
app.use('/product',productRouter);
app.use('/add-product',addproductRouter);
app.use('/edit-product',editproductRouter);
app.use('/search',searchRouter);


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
