var express = require('express');
var path = require('path');
//处理收藏夹图标
var favicon = require('serve-favicon');
//写日志的
var logger = require('morgan');
//解析cookie的
var cookieParser = require('cookie-parser');
//解析请求体的，用后，req多req.cookie方法：用来设置cookie。req.cookies:把请求中的cookie封装成对象
//解析请求体，多哦req.body
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// 设置模板的更路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//使用日志中间件
app.use(logger('dev'));
//解析json类型请求体 通过请求头中的content-type
app.use(bodyParser.json());
///解析urlencoded类型请求体 通过请求头中的content-type 解析字符创的，比如name=zfpx
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//静态文件服务中间件
app.use(express.static(path.join(__dirname, 'public')));
//路由配置，第一个是根目录，第一个试试一级目录
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
//捕获404的错误，并且转发到错误处理中间件中去
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  //错误处理中间件，多了一个参数
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
