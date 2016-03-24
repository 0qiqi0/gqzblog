var express = require('express');
//生成一个路由实例
var router = express.Router();
//请求一张空白的发表文章的页面
router.get('/add',function(req,res){
  res.render('article/add')
});

//提交文章数据
router.post('/add',function(req,res){
  res.send('article/add');
});


module.exports = router;
