var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var mensagemRouter = require('./routes/mensagens');
var usersRouter = require('./routes/usuarios');
var loginRouter = require('./routes/login');

var Usuarios = require('./models/usuarios');

var app = express();


(async () => {
  const database = require('./db');

  try {
      await database.sync({ force: true });
      Usuarios.create({'username': 'teste', 'password': 'teste'}).then(e=>console.log(e))
  } catch (error) {
      console.log(error);
  }
})();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/login', loginRouter);
app.use('/usuario', usersRouter);


var validateToken = require('./middleware/validateToken');
app.use('*', validateToken.tokenValidated)

app.use('/mensagem', mensagemRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)
  res.sendStatus(err.status || 500);
});

module.exports = app;
