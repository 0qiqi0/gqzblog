var express = require('express');
var path = require('path');
//处理收藏夹图标
var favicon = require('serve-favicon');
//写日志的
var logger = require('morgan');
//解析cookie的
//解析请求体的，用后，req多req.cookie（）方法：用来设置cookie。req.cookies:把请求中的cookie封装成对象
var cookieParser = require('cookie-parser');

//var bootstrap = require('bootstrap'); 如果不在public下建lib放入css，该如果引入link css

//解析请求体，多req.body
var bodyParser = require('body-parser');
//根据请求的路径不同进行不同的处理
var routes = require('./routes/index');
var users = require('./routes/users');

var articles = require('./routes/articles');
var session=require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var app = express(); //app是一个调用express（也是个函数）后的函数（监听函数）
var flash = require('connect-flash');

// 设置模板的更路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'html');
app.engine('html',require('ejs').renderFile);
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gqzblog');
//定义模型:1集合的名称
//使用了会话中间件后朵儿req。session
app.use(session({
  secret: 'gqzblog',
  resave: false,
  saveUninitialized: true,
  //指定保存的位置，可以保存到redis，mongo等等
  store:new MongoStore({mongooseConnection: mongoose.connection})
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//使用日志中间件
app.use(logger('dev'));
//解析json类型请求体 通过请求头中的content-type
app.use(bodyParser.json());
//解析urlencoded类型请求体 通过请求头中的content-type 解析字符创的，比如name=zfpx
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
//静态文件服务中间件
app.use(express.static(path.join(__dirname, 'public')));
//配置模板中间件
app.use(function(req,res,next){
  //res.locals.才是真正的渲染模板的对象。render的第二个参数对象最后会合并到res.locals
  res.locals.user=req.session.user;
  res.locals.success=req.flash('success').toString();
  res.locals.error=req.flash('error').toString();
  next();
})
//路由配置，第一个是根目录，第一个试试一级目录
app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);

// catch 404 and forward to error handler
//捕获404的错误，并且转发到错误处理中间件中去
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// 开发环境错误处理，将打印出错误的调用堆栈
//此处没调next，就不往下走了。
if (app.get('env') === 'development') {
  //错误处理中间件，多了一个err参数
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 生产环境的错误处理，不把堆栈信息给用户
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error:{}
  });
});

module.exports = app;
