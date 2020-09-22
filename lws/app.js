var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var Sequelize = require('sequelize');

var app = express();

// sync() method call
const models = require("./models/index.js");
models.sequelize.sync().then(() => {
  console.log("DB 연결 성공");
}).catch(err => {
  console.log("DB 연결 실패");
  console.log(err);;
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));

// 세션 설정
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env]; // DB 관련 정보를 config 파일에서 불러옴
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var myStore = new SequelizeStore({
  db: sequelize,
  expiration: 1000 * 60 * 60 * 24 // 쿠키 유효시간 
});

app.use(session({
  key: 'sid', // 세션 키 값
  secret: 'keyboard cat', // 세션 비밀 키(세션 암호화하여 저장)
  store: myStore,
  resave: false,  // 세션을 항상 저장할 지 여부(false 권장)
  saveUninitialized: true,  // 세션이 저장되기 전에 uninitialize 상태로 만들어 저장
}));
myStore.sync();

// passport 설정 (세션 설정 이후에 위치해야 함)
var passport = require('./lib/passport_set')(app, models);

// 라우터
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')(passport);
var serviceRouter = require('./routes/service')(session);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/service', serviceRouter);

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
