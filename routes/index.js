var express = require('express');
//这是一个路由的实例
var router = express.Router();

/* GET home page. */
//用户访问/时
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
