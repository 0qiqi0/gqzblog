var express = require('express');
var articleModel = require('../model/article');
//生成一个路由实例
var router = express.Router();
//请求一张空白的发表文章的页面
router.get('/add',function(req,res){
  res.render('article/add',{article:{}});
});

//提交文章数据
router.post('/add',function(req,res){
  var article=req.body;
  var user=req.session.user; //获取作者，就是登录的人
  article.user=user; //user是个对象，但保存进数据库的是个ID字符串
  articleModel.create(article,function(err,article){
    if(err){
      req.flash('error','发表文章失败')
      return res.redirect('/')
    }else{
      req.flash('success','发表文章成功')
      return res.redirect('/')
    }
  })

});


module.exports = router;
